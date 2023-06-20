import Test, { Question } from "../models/Test.js"
import Result from "../models/Result.js"
import { Types } from 'mongoose'

import excel from 'exceljs'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { v4 as uuid } from 'uuid'

const dirname = fileURLToPath(new URL('.', import.meta.url));

function checkTrueVarinat(questions) {
    return questions.reduce((a, b) => {
        return a + (b.variants.find(v => v._id.toString() === b.selected)?.value || 0)
    }, 0)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

export const getResults = async (req, res) => {
    try {
        const result = await Result.aggregate([
            { $match: { status: 'finish' } },
            {
                $lookup: {
                    from: "users",
                    localField: "student",
                    foreignField: "_id",
                    as: "student",
                    pipeline: [{
                        $lookup: {
                            from: "groups",
                            localField: "group",
                            foreignField: "_id",
                            as: "group",
                        }
                    }, {
                        $project: {
                            name: 1,
                            group: { $arrayElemAt: ["$group.name", 0] },
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: "tests",
                    localField: "test",
                    foreignField: "_id",
                    as: "test",
                    pipeline: [{
                        $project: {
                            name: 1
                        }
                    }]
                }
            },
            {
                $project: {
                    student: { $arrayElemAt: ["$student", 0] },
                    test: { $arrayElemAt: ["$test", 0] },
                    start_time: 1,
                    end_time: 1,
                    rate: 1,
                    questions: { $size: "$questions" },
                }
            },
            // {
            //     $group: {
            //         _id:  "$student.group",
            //         results: { $push: "$$ROOT" }
            //     }
            // },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getResultByUser = async (req, res) => {
    try {
        const result = await Result.aggregate([
            { $match: { student: new Types.ObjectId(req.params.id), status: 'finish' } },
            {
                $lookup: {
                    from: "users",
                    localField: "student",
                    foreignField: "_id",
                    as: "student",
                    pipeline: [{
                        $lookup: {
                            from: "groups",
                            localField: "group",
                            foreignField: "_id",
                            as: "group",
                        }
                    }, {
                        $project: {
                            name: 1,
                            group: { $arrayElemAt: ["$group", 0] },
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: "tests",
                    localField: "test",
                    foreignField: "_id",
                    as: "test",
                    pipeline: [{
                        $project: {
                            name: 1
                        }
                    }]
                }
            },
            {
                $project: {
                    student: { $arrayElemAt: ["$student", 0] },
                    test: { $arrayElemAt: ["$test", 0] },
                    start_time: 1,
                    end_time: 1,
                    rate: 1,
                    questions: { $size: "$questions" },
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const start = async (req, res) => {
    try {
        const result = await Result.findOne({ $and: [{ test: req.params.id }, { student: req.user?._id }] })
        const { count } = await Test.findById(req.params.id)
        if (!result) {
            const qs = await Question.aggregate([
                { $match: { test: new Types.ObjectId(req.params.id) } },
                { $sample: { size: count } },
                { $project: {
                    text: 1,
                    variants: 1
                  }}
            ])
            const questions = qs.map(q => ({ ...q, selected: '', variants: shuffleArray(q.variants) }))
            const newResult = await Result.create({ test: req.params.id, status: 'start', student: req.user?._id, start_time: Date.now().toString(), questions })
            res.status(200).json(newResult)
        } else {
            res.status(200).json(result)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getTest = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)
            .populate('test')
            .populate('student', 'name group')
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const updateVarint = async (req, res) => {
    try {
        await Result.findByIdAndUpdate(req.params.id, { $set: { ["questions." + req.params.n + ".selected"]: req.params.v } })
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const finishTest = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)
        const newResult = {
            status: 'finish',
            rate: checkTrueVarinat(result.questions),
            end_time: Date.now().toString(),
        }
        if(req.query.secretcode) delete newResult.end_time 
        await Result.findByIdAndUpdate(req.params.id, {
            $set: newResult
        })
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteResult = async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}




export const getAll = async (req, res) => {
    try {
        const result = await Test.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getById = async (req, res) => {
    try {
        const result = await Test.aggregate([
            {
                $match: { "_id": new Types.ObjectId(`${req.params.id}`) }
            },
            {
                $lookup: {
                    from: 'questions',
                    foreignField: 'test',
                    localField: '_id',
                    as: 'questions'
                }
            }
        ])
        res.status(200).json(result[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const create = async (req, res) => {
    try {
        const { questions, ...testdata } = req.body
        const test = await Test.create(testdata)
        questions.forEach(q => q.test = test._id)
        const question = await Question.create(questions)
        res.status(200).json({ ...test._doc, questions: question })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const updateTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(test)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteTest = async (req, res) => {
    try {
        await Test.findByIdAndDelete(req.params.id)
        await Question.deleteMany({ test: req.params.id })
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}


export const createQuestion = async (req, res) => {
    try {
        const result = await Question.create(req.body)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const updateQuestion = async (req, res) => {
    try {
        const result = await Question.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getTestForGroup = async (req, res) => {
    try {
        const today = new Date();
        const dateParts = [
            today.getFullYear().toString().substring(0),
            (today.getMonth() + 1).toString().padStart(2, '0'),
            today.getDate().toString().padStart(2, '0'),
        ];
        const dateString = dateParts.join('-');
        // console.log(dateString);
        const result = await Test.aggregate([
            {
                $match: {
                    groups: { $in: [req.user?.group] },
                    date: dateString
                }
            },
            {
                $lookup: {
                    from: 'results',
                    foreignField: 'test',
                    localField: '_id',
                    as: 'result',
                    pipeline: [{
                        $match: {
                            student: new Types.ObjectId(req.user?._id),
                            status: 'finish'
                        }
                    }, {
                        $project: {
                            end_time: 1,
                            rate: 1,
                            start_time: 1,
                            status: 1,
                            student: 1,
                            test: 1,
                        }
                    }]
                }
            },
            {
                $project: {
                    count: 1,
                    date: 1,
                    groups: 1,
                    name: 1,
                    science: 1,
                    time: 1,
                    result: { $arrayElemAt: ["$result", 0] },
                }
            },
            {
                $sort: { _id: -1 }
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const download = async (req, res) => {
    try {
        // const result = await Result.aggregate([
        //     { $match: { status: 'finish' } },
        //     {
        //         $lookup: {
        //             from: "users",
        //             localField: "student",
        //             foreignField: "_id",
        //             as: "student",
        //             pipeline: [{
        //                 $lookup: {
        //                     from: "groups",
        //                     localField: "group",
        //                     foreignField: "_id",
        //                     as: "group",
        //                 }
        //             },{
        //                 $project: {
        //                     name: 1,
        //                     group: {$arrayElemAt:["$group.name", 0]},
        //                 }
        //             }]
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "tests",
        //             localField: "test",
        //             foreignField: "_id",
        //             as: "test",
        //             pipeline: [{
        //                 $project: {
        //                     name: 1
        //                 }
        //             }]
        //         }
        //     },
        //     {
        //         $project: {
        //             student: {$arrayElemAt:["$student", 0]},
        //             test: {$arrayElemAt:["$test", 0]},
        //             start_time: 1,
        //             end_time: 1,
        //             rate: 1,
        //             questions: {$size: "$questions"},
        //         }
        //     },
        //     {
        //         $sort: {
        //             _id: -1
        //         }
        //     }
        // ])
        // console.log(req.query);
        const { group, ...other } = req.query
        const result = await Result.find({ status: 'finish', ...other})
            .populate('test', 'name count')
            .populate({
                path: 'student',
                select: ['name', 'group'],
                model: 'users',
                populate: {
                    path: 'group',
                    model: 'groups',
                }
            })
            .select('test student rate')
        const workbook = new excel.Workbook()
        const worksheet = workbook.addWorksheet('Results')
        worksheet.columns = [
            { header: 'Test nomi', key: 'test.name', width: 20 },
            { header: 'Talaba', key: 'student.name', width: 25 },
            { header: 'Guruhi', key: 'student.group', width: 15 },
            { header: "To'gri javoblar", key: 'rate', width: 15 },
            { header: "Foizi", key: 'percent', width: 15 },
        ]
        result.forEach(r => {
            if(group){
                if(group === r.student.group.id){
                    worksheet.addRow({
                        'rate': r.rate,
                        'student.name': r.student.name,
                        'test.name': r.test.name,
                        'student.group': r.student.group.name,
                        'percent': parseFloat(r.rate * 100 / r.test.count).toFixed(1)
                    })
                }
            }else{
                worksheet.addRow({
                    'rate': r.rate,
                    'student.name': r.student.name,
                    'test.name': r.test.name,
                    'student.group': r.student.group.name,
                    'percent': parseFloat(r.rate * 100 / r.test.count).toFixed(1)
                })
            }
        })
        const file = path.join(dirname, '../', 'protected', `file-${uuid()}.xlsx`);
        workbook.xlsx.writeFile(file)
            .then(() => {
                res.setHeader('Content-disposition', 'attachment; filename=file.xlsx');
                res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.download(file, () => {
                    setTimeout(() => fs.rmSync(file, { force: true }), 10000)
                })
            }).catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}
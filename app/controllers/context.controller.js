const db = require("../models/index");
const Context = db.context;

exports.toggleListening = async (req, res) => {
  await Context.find().then(async (ctx) => {
    const cntxt = ctx[0];
    cntxt.listen = !cntxt.listen;
    await cntxt.save().then((res1) => {
      return res.status(200).send(cntxt.listen);
    });
  });
};

exports.addToMsg = async (req, res) => {
  const ctx = (await Context.find())[0];
  ctx.impMsg.push(req.body.msg);
  await ctx.save().then((ress) => {
    return res.status(200).send("Success");
  });
};

exports.getContext = async (req, res) => {
  const ctx = await Context.find();
  return res.status(200).send(ctx[0]);
};

exports.getListeningStatus = async (req, res) => {
  const ctx = await Context.find();
  return res.status(200).send(ctx[0].listen);
};

exports.deleteAllMsgs = async (req, res) => {
  const ctx = await Context.find();
  ctx[0].impMsg = [];
  await ctx[0].save().then((ress) => {
    return res.status(200).send("Success");
  });
};
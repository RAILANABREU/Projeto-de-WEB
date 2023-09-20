const monggose = require("mongoose");
const conectDatabase = () => {
  console.log("Conectando ao banco de dados");
  monggose
    .connect(
      "mongodb+srv://railandeabreu:srt180te@cluster0.y1rasit.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => console.log("Conectado com sucesso"))
    .catch((error) => console.log(error));
};

module.exports = conectDatabase;
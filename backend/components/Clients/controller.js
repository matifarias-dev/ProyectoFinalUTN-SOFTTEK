const Model = require("./model");

const findClient = (email) => {
    return new Promise((resolve, reject) => {
        if (!email) reject("falta parametor email");

        Model.find({ email: email })
            .then((client) => {
                resolve(client);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const saveClient = (data) => {
    return new Promise(async (resolve, reject) => {
        if (
            data.hasOwnProperty("name") &&
            data.hasOwnProperty("email") &&
            data.hasOwnProperty("password")
        ) {
            let searchClient = await findClient(data.email);
            console.log(data.email);
            console.log(searchClient);
            if (searchClient.lenth === 0) {
                reject("Cliente no registrado");
            }
            if (searchClient.length > 0)
                reject("Cliente ya registrado con email: ", data.email);

            const client = new Model({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            client
                .save()
                .then((stored) => resolve(stored))
                .catch((err) => reject(err));
        } else {
            reject("Faltan parametros");
        }
    });
};

const login = (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
        if (data.hasOwnProperty("email") && data.hasOwnProperty("password")) {
            let searchClient = await findClient(data.email);
            if (searchClient.length === 0) {
                reject("Contraseña o email incorrecto");
            }
            if (searchClient.length > 0) {
                if (String(searchClient[0].password) === String(data.password))
                    resolve(searchClient[0]);

                reject("Contraseña o email incorrecto");
            }
        } else {
            reject("Faltan parametros");
        }
    });
};

module.exports = {
    saveClient,
    findClient,
    login,
};
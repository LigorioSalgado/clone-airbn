'use strict';

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "El email debe ser unico" },
      validate: {
        isEmail: {
          args: true,
          msg: 'No es una dirección de correo electrónico.'
        },
        notEmpty: {
          args: true,
          msg: "Email es requerido"
        }
      }

    },
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    description: DataTypes.TEXT,
    score: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    user_pay: DataTypes.STRING
  }, {});
  User.beforeCreate(function (user, options) {
    return cryptPassword(user.password).then(function (success) {
      user.password = success;
    }).catch(function (err) {
      if (err) console.log(err);
    });
  });

  var cryptPassword = function cryptPassword(password) {
    console.log("cryptPassword" + password);
    return new Promise(function (resolve, reject) {
      _bcryptNodejs2.default.genSalt(10, function (err, salt) {
        // Encrypt password using bycrpt module
        if (err) return reject(err);

        _bcryptNodejs2.default.hash(password, salt, null, function (err, hash) {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
  };

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
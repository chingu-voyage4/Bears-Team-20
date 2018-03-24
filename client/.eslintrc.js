module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true
    },
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "jsx-a11y/anchor-is-valid": [ "error", {
        "specialLink": [ "hrefLeft", "hrefRight" ],
        "aspects": [ "noHref", "invalidHref", "preferButton" ]
      }]
    },
};
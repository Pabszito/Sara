const Guild = require(`../schema/guild`);

class Language {

    /**
    * @param spanishLanguage The spanish language file
    * @param englishLanguage The english language file
    */
    constructor(spanishLanguage, englishLanguage){
        this.spanishLanguage = spanishLanguage;
        this.englishLanguage = englishLanguage;
    }

    /**
    * @param path The path
    * @param guild The guild ID
    * @return A message
    */
    async getString(path, guild){
        let language = "es";
        Guild.findOne({
            id: guild
        }, (err, res) => {
            if(err) return console.error(err);
            if(!res) return console.error(`Unable to get the guild with ID ${guild}`);
        });
    }


    /**
    * @param path The path where the integer is located
    * @param guild The guild ID
    * @return A integer. If null, a valid integer wasn't specified.
    */
    async getInt(path, guild){

    }
}

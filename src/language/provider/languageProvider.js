const languages = {
    ENGLISH: "en-US",
    SPANISH: "es-AR"
}

const Guild = require('../schema/guild');

class LanguageProvider {

    async getGuildLanguage(guild){
        Guild.findOne({
            id: guild
        }, (err, res) => {
            if(err) return languges.ENGLISH;
            if(!res) return languages.ENGLISH;
            
        })
    }

    /**
    * @return A language enumeration.
    */
    async getLanguages(){
        return languages;
    }
}

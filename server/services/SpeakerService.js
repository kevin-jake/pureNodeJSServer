const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)


class SpeakerService {
    constructor(datafile) {
        this.datafile = datafile;
    }

    async getData() {
        const data = await readFile(this.datafile, 'utf8')
        if (!data) return []
        return JSON.parse(data).speakers;
    }

    async getNames() {
        const data = await this.getData();
    
        return data.map((speaker) => {
          return { name: speaker.name, shortname: speaker.shortname };
        });
      }
}

module.exports = SpeakerService;
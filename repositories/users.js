const fs = require("fs");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
  // N.B. constructors are not allowed to be asyncronous
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }
    this.filename = filename;
    // checking to see if filename exists
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  // Outside of constructors, ideal to work with Promises as much as possible

  async getAll() {
    // Open the file called this.filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }
  // attr = attributes
  async create(attrs) {
    //attrs === { email: '', password: '' }
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    // saved = pw saved in our database -> 'hashed.salt'
    // supplied = pw given by user trying to sign in

    // const result = saved.split(".");
    // const hashed = result[0];
    // const salt = result[1];

    const [hashed, salt] = saved.split(".");
    const hashedSupplied = await scrypt(supplied, salt, 64);

    return hashed === hashedSupplied
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
}

module.exports = new UsersRepository("users.json");

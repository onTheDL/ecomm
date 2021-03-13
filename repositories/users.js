const fs = require("fs");
const crypto = require('crypto')

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
    attrs.id = this.randomId()

    const records = await this.getAll()
    records.push(attrs)

    await this.writeAll(records)
  }

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex')
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");

  await repo.create({ email: 'test@test.com', password: 'password' })

  const users = await repo.getAll();

  console.log(users);
};

test();

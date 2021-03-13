const fs = require("fs");

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
    const contents = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });

    // Read its contents
    console.log(contents)
    // Parse the contents
    // Return the parsed data
  }
}

const test = async () => {
  const repo = new UsersRepository('user.json')

  await repo.getAll()
}

test()

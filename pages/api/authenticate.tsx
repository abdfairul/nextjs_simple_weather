export default function authenticate(req:any, res:any) {
    const omit = (obj:any, key:any) => {
      const { [key]: omitted, ...rest } = obj;
      return rest;
    }

    let adminUser = {
        "id": 1,
        "username": "ADMIN",
        "password": "ADMIN",
        "firstName": "Admin",
        "lastName": "Admin"
    }

    const { username, password } = req.body;
    if (username === adminUser.username)
    {
      return res.status(200).json(omit(adminUser, 'password'));
    }
    else
    {
      return res.status(500).json({"message":"Incorrect Credential"});
    }
}

import User from "../../database/models/UserModel";

export const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc3OTQxOTcsImV4cCI6MTY3ODM5ODk5N30.GVrjawX0ky8V-NRdKVqi8Kq3I-O0B6v08ZyEE2MAor8';

export const userLoginMock = new User({
  id: 1, 
  username: 'Admin', 
  role: 'admin', 
  email: 'admin@admin.com', 
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
});


export const decoded = {
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  iat: 1677794197,
  exp: 1678398997
}
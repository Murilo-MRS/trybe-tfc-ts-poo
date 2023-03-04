import User from "../../database/models/UserModel";

export const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc4ODMwNTEsImV4cCI6MTY3ODQ4Nzg1MX0.etvN4JIrZBLIkTR-D6SxFC5gPIsHtHBLMo-pg0j-3o4';

export const userLoginMock = new User({
  id: 1, 
  username: 'Admin', 
  role: 'admin', 
  email: 'admin@admin.com', 
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}) as User;


export const decoded = {
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  iat: 1677794197,
  exp: 1678398997
}
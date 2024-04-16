const http = require('http');
const mysql = require('mysql');
const { version } = require('os');
const { parseArgs } = require('util');

// MySQL database configuration
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'pwb'
};

const hostname = '127.0.0.1';
const port = 3000;

// Function to authenticate the user against the MySQL database
function authenticateUser(username, password, callback) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
        console.log(err);
      callback(err, false);
      return;
    }

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    connection.query(query, (error, results) => {

      connection.end(); // Close the connection to the database

      if (error) {
        console.log(error);
        callback(error, false);
        return;
      }

      if (results.length > 0) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  });
}

function addProject(project, callback) {
    const connection = mysql.createConnection(dbConfig);
  
    connection.connect(async(err)  => {
      if (err) {
        callback(err);
        return;
      }
    //   create an variable to store the Id project.TeamlLead
    var teamLeadID;

    //   get the Id project.TeamlLead from Users
        const query = `SELECT * FROM users WHERE FullName = '${project.TeamLead}'`;
        // create an async function to get the Id project.TeamlLead from Users
        const getTeamLeadID = async () => {
            return new Promise((resolve, reject) => {
                connection.query(query, (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    if (results.length > 0) {
                        resolve(results[0].UserID);
                    } else {
                        reject('Team Lead not found');
                    }
                });
            });
        };
        // get the Id project.TeamlLead from Users
        teamLeadID = await getTeamLeadID();

        console.log(teamLeadID);
  
      const insertQuery = `INSERT INTO projects (ProjectID, ProjectName, ProjectDescription, TeamLead) VALUES (${project.ProjectID}, '${project.ProjectName}', '${project.ProjectDescription}', ${teamLeadID})`;
      
      connection.query(insertQuery, (err, result) => {
        connection.end(); // Close the connection to the database
  
        if (err) {
            console.log(err);
          callback(err);
          return;
        }
  
        callback(null);
      });
    });
  }

  function addVersion(project, callback) {
    const connection = mysql.createConnection(dbConfig);
  
    connection.connect(async(err)  => {
      if (err) {
        callback(err);
        return;
      }
    //   create an variable to store the Id project.TeamlLead
    var projectName;
    console.log(project.ProjectID);

    //   get the Id project.TeamlLead from Users
        const query = `SELECT * FROM projects WHERE ProjectName = '${project.ProjectID}'`;
        // create an async function to get the Id project.TeamlLead from Users
        const getTeamLeadID = async () => {
            return new Promise((resolve, reject) => {
                connection.query(query, (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    if (results.length > 0) {
                        // console.log(results[0].UserID);
                        // console.log(results);
                        resolve(results[0].ProjectID);
                    } else {
                        reject('Team Lead not found');
                    }
                });
            });
        };
        // get the Id project.TeamlLead from Users
        projectName = await getTeamLeadID();

        console.log(projectName);
        // callback(null);
  
      const insertQuery = `INSERT INTO Versions (VersionID, ProjectID, VersionName) VALUES (${project.VersionID}, '${projectName}', '${project.VersionName}')`;
      
      connection.query(insertQuery, (err, result) => {
        connection.end(); // Close the connection to the database
  
        if (err) {
            console.log(err);
          callback(err);
          return;
        }
  
        callback(null);
      });
    });
  }


  function addIssue(project, callback) {
    const connection = mysql.createConnection(dbConfig);
  
    connection.connect(async(err)  => {
      if (err) {
        callback(err);
        return;
      }
    //   create an variable to store the Id project.TeamlLead
    var projectName;
    var versionName;
    var username;
    // console.log(project.ProjectID);

    //   get the Id project.TeamlLead from Users
        const query = `SELECT * FROM projects WHERE ProjectName = '${project.ProjectID}'`;
        // create an async function to get the Id project.TeamlLead from Users
        const getProjectID = async () => {
            return new Promise((resolve, reject) => {
                connection.query(query, (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    if (results.length > 0) {
                        resolve(results[0].ProjectID);
                    } else {
                        reject('Team Lead not found');
                    }
                });
            });
        };

        const query2 = `SELECT * FROM versions WHERE VersionName = '${project.VersionID}'`;
        // create an async function to get the Id project.TeamlLead from Users
        const getVersionID = async () => {
            return new Promise((resolve, reject) => {
                connection.query(query2, (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    if (results.length > 0) {
                        // console.log(results);
                        resolve(results[0].VersionID);
                    } else {
                        reject('Team Lead not found');
                    }
                });
            });
        };


        const query3 = `SELECT * FROM users WHERE FullName = '${project.assignedTo}'`;
        // create an async function to get the Id project.TeamlLead from Users
        const getUsername = async () => {
            return new Promise((resolve, reject) => {
                connection.query(query3, (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    if (results.length > 0) {
                        // console.log(results);
                        resolve(results[0].UserID);
                    } else {
                        reject('Team Lead not found');
                    }
                });
            });
        };






        // get the Id project.TeamlLead from Users
        projectName = await getProjectID();
        versionName = await getVersionID();
        username = await getUsername();

        // console.log(username);
        // callback(null);
  
      const insertQuery = `INSERT INTO issues (IssueID, ProjectID, VersionID, IssueType, Summary, DetailedDescription, assignedTo, Status, Priority, DueDate, LastCommentID) VALUES (${project.IssueID}, '${projectName}', '${versionName}', '${project.IssueType}','${project.Summary}', '${project.DetailedDescription}', '${username}', '${project.Status}', '${project.Priority}',STR_TO_DATE('${project.DueDate}', '%m/%d/%Y'), '${project.LastCommentID}' )`;
      
      connection.query(insertQuery, (err, result) => {
        connection.end(); // Close the connection to the database
  
        if (err) {
            console.log(err);
          callback(err);
          return;
        }
  
        callback(null);
      });
    });
  }

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/login') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const username = formData.get('username');
      const password = formData.get('password');

    //   log console data
    console.log(username);

      if (username && password) {
        authenticateUser(username, password, (error, isAuthenticated) => {
          if (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
            return;
          }

          if (isAuthenticated) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Authentication successful');
          } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Invalid username or password');
          }
        });
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Username and password are required');
      }
    });
  } else if (req.method === 'POST' && req.url === '/addProject'){
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const projectID = formData.get('ProjectID');
      const projectName = formData.get('ProjectName');
      const projectDescription = formData.get('ProjectDescription');
      const teamLead = formData.get('TeamLead');

      if (projectID && projectName && teamLead) {
        const project = {
          ProjectID: parseInt(projectID),
          ProjectName: projectName,
          ProjectDescription: projectDescription || '',
          TeamLead: teamLead
        };

        addProject(project, (error) => {
          if (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Project added successfully');
        });
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('ProjectID, ProjectName, and TeamLead are required');
      }
    });
    
  }else if (req.method === 'POST' && req.url === '/addVersion'){

    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const projectID = formData.get('ProjectID');
      const VersionID = formData.get('VersionID');
      const VersionName = formData.get('VersionName');

      if (projectID && VersionID && VersionName) {
        const version = {
          ProjectID: projectID,
          VersionID: parseInt(VersionID),
          VersionName: VersionName
        };
        console.log(version);

        addVersion(version, (error) => {
          if (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Project Version added successfully');
        });
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('ProjectID, VersionID, and VersionName are required');
      }
    });
    
  }else if (req.method === 'POST' && req.url === '/addIssue'){

    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {

        const formData = new URLSearchParams(body);
        const IssueID = formData.get('IssueID');
        const ProjectID = formData.get('ProjectID');
        const VersionID = formData.get('VersionID');
        const IssueType = formData.get('IssueType');
        const Summary = formData.get('Summary');
        const DetailedDescription = formData.get('DetailedDescription');
        const AssignedTo = formData.get('AssignedTo');
        const Status = formData.get('Status');
        const Priority = formData.get('Priority');
        const DueDate = formData.get('DueDate');
        const LastCommentID = formData.get('LastCommentID');

      if (IssueID && ProjectID && IssueType && Summary && Status && Priority) { 
        const issue = {
            IssueID: parseInt(IssueID),
            ProjectID: ProjectID,
            VersionID: VersionID,
            IssueType: IssueType,
            Summary: Summary,
            DetailedDescription: DetailedDescription || '',
            assignedTo: AssignedTo,
            Status: Status,
            Priority: Priority,
            // DueDate: parse as date
            DueDate: DueDate ,
            LastCommentID: parseInt(LastCommentID)
        };
        
        console.log(issue);

        addIssue(issue, (error) => {
          if (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Issue added successfully');
        });
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('ProjectID, VersionID, and VersionName are required');
      }
    });

    

  }else{

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const shell = require('shelljs')
const chalk = require('chalk')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const path = require('path')
const { execSync } = require('child_process')
var rimraf = require('rimraf')
const readline = require('readline')
// const ignore = require('./gitIgnoreFile')

var prompt = inquirer.createPromptModule()

const allQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'Please enter project name',
  },
  {
    type: 'input',
    name: 'repository',
    message: 'Please enter git url',
  },
  {
    type: 'list',
    name: 'projectType',
    message: 'What is your project type?',
    choices: ['Page content', 'Components library'],
  },
]

function hasYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}


function getConfigs( folderName) {
  const questions = ([
    !folderName ? {
      type: 'input',
      name: 'folderName',
      message: 'Please enter folder name',
      default: 'client',
    } : null,
    ...allQuestions,
  ]).filter(Boolean)


  return prompt(questions)
    .then((userconfigs) => {
      if(!folderName && !userconfigs.folderName) {
        throw new Error(chalk.red('Folder name is required'))
      }
      return userconfigs
    })
}


function updatePkg(pkgPath, { name, repository }) {
  if(!name && !repository) {
    return Promise.resolve()
  }
  fs.readFile(pkgPath, 'utf-8')
    .then(content => {
      const pkg = JSON.parse(content)
      if(name){
        pkg.name = name
      }
      if(repository) {
        pkg.bugs = `${repository}/issues`
        pkg.repository = repository
      }
      return fs.outputFile(pkgPath, JSON.stringify(pkg, null, 2))
        .catch(err => {
          console.log(chalk.red('Failed to update package.json'))
          throw err
        })
    })
}

// function writeGitIgnore(folder) {
//   return fs.outputFile(path.join(pkgPath, '.gitignore'), ignore)
//     .catch(err => {
//       console.log(chalk.red('Failed to .gitignore'))
//       throw err
//     })
// }


function getTemplate(projectType){
  switch(projectType){
    case 'Page content':
      return path.join(__dirname, "../templates/page-template")
    default:
      return null
  }
}

function init(
  rootDir,
  folderName
) {
  const useYarn = hasYarn()
  if(!useYarn) {
    throw new Error(chalk.red('Please install yarn'))
  }
  let dest
  let configs = { folderName }


  getConfigs(folderName)
    .then(userconfigs => {
      configs = { ...configs, ...userconfigs }

      dest = path.resolve(rootDir, configs.folderName)
      if(fs.existsSync(dest)) {
        throw new Error(chalk.red(`Directory already exists at ${dest} !`))
      }

      const template = getTemplate(configs.projectType)
      if(!template) {
        throw new Error(chalk.red(`Sorry template "${configs.projectType}" is under development ((((`))
      }
      console.log()
      console.log(chalk.cyan('Creating new project ...'))
      console.log()
      console.log(chalk.cyan('Copying additional files..'))


      return fs.copy(template, dest)

      // if(shell.exec(`git clone --recursive https://github.com/django-stars/frontend-skeleton ${dest}`, { silent: true }).code !== 0) {
      //   throw new Error(chalk.red(`Cloning git repo failed!`))
      // }

      // shell.exec(`cd ./${configs.folderName} && git fetch origin && git checkout next-generation`)

      // console.log(chalk.cyan('Cloning git repository finished'))
      // return updatePkg(path.join(dest, 'package.json'), configs)
    })
    .then(()=>{
       return updatePkg(path.join(dest, 'package.json'), configs) 
    })
    .then(_ => {
      const pkgManager = 'yarn'
      console.log(`Installing dependencies with: ${chalk.cyan(pkgManager)}`)


      try {
        const dependencies = 'react react-dom'
        const devDependencies = 'eslint-config-cond husky lint-staged madge stylelint-config-cond test-react-scripts-cond'
        shell.exec(`cd ./${configs.folderName} && yarn add ${dependencies} && yarn add ${devDependencies} -D`)
      } catch (err) {
        console.log(chalk.red('Installation failed'))
        throw err
      }

      const cdpath =
      path.join(process.cwd(), configs.folderName) === dest
        ? configs.folderName
        : path.relative(process.cwd(), configs.folderName)

      console.log()
      console.log(`Success! Created ${chalk.cyan(cdpath)}`)
      console.log('Inside that directory, you can run several commands:')
      console.log()
      console.log(chalk.cyan(`  ${pkgManager} start`))
      console.log('    Starts the development server.')
      console.log()
      console.log(chalk.cyan(`  ${pkgManager} build`))
      console.log('    Bundles the app into static files for production.')
      console.log()
      console.log('We suggest that you begin by typing:')
      console.log()
      console.log(chalk.cyan('  cd'), `./${cdpath}`)
      console.log(`  ${chalk.cyan(`${pkgManager} start`)}`)

      console.log()
      console.log('Happy codding!')
    })
}

module.exports = init

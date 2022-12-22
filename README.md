
- [HodoPile](#hodopile)
  - [Heroku Deployment of Server Side Rendered Application](#heroku-deployment-of-server-side-rendered-application)
  - [Stretch Goals](#stretch-goals)
  - [Minimum Viable Product I](#minimum-viable-product-i)
    - [MVP I - User Stories:](#mvp-i---user-stories)
  - [Team Git and GitHub Workflow](#team-git-and-github-workflow)
  - [TLG Presentation](#tlg-presentation)
    - [Landing Page](#landing-page)
    - [MPV I - WireFrame](#mpv-i---wireframe)
  - [Deprecated](#deprecated)

# HodoPile
Friendly trip advisor guide where a user can have a personalized destination search experience 

## Heroku Deployment of Server Side Rendered Application
Deployed via [ Heroku ](https://hodopile-server.herokuapp.com/)
(Link Deactivates Dec 26 2022 )

## Stretch Goals

- Integrate APIS tha improve the user experience
  - [Google Trends API](https://trends.google.com/trends/?geo=US)
    - to yield most popular locations based on word search popularity
  - [Travel Advisory API](https://www.travel-advisory.info/)
    - to rate a users favorited location against government/official risk scores (0-5)
- Improve Aesthetics/Styling using [Daisy.ui](https://daisyui.com/)
- Render tags field on destination card to hook the user into searching for more locations, 
  - this is intended to enhance the user experience by personilzing subsequent search requests on their initial query
- Integrate npm library [async](https://caolan.github.io/async/v3/)
   - use async to handle parallel queries made to DB resolves the use of nested queries and nested promises
   - will improve developent environment by improving the  readability/maintanability of the code base 

[top](#hodopile)
## Minimum Viable Product I
### MVP I - User Stories:

GENERAL USER
- As a user I want to view a list of destination locations
- As a user I want to search for a location 
- As a user I want to view locations that are trending (WIP)

BASIC USER    
- As a user I want to login/logout from my account
- As a user I want to create a profile 
- As a user I want to be able to navigate to view my profile
- As a user I want to be able to update their profile

- As a user I want to be able to save my favorate locations
- As a user I want to view a list of favorated locations
- As a user I want to be able to view locations by my personal interests (WIP)
- As a user I want to be able to view locations by their rating (WIP)


[top](#hodopile)
## Team Git and GitHub Workflow
On Local Machine
- `git branch` list all local branches
- `git branch -r` list all remote branches (if want to see what branches are on remote)

- `git switch dev` OR `git checkout dev` moves you to dev branch
- `git checkout -b <new branchName>`  OR  `git switch -c <new branchName>` 
  - create a new branch off of dev
  - creates a local branch only (not tracking any remote branch named: `<new branchName>`)
- Implent a feature based on issue
  - add new code 

- `git add .` add all current changes and prepare for staging
- `git commit -m "message: what this commit does"` commit 
- `git push origin <new branchName>` 
  
On GH
- create a PR
- make sure you double check: base === dev
- wait for it to be approved / reviewed by team member


[top](#hodopile)
## TLG Presentation 
Canva Project Slideshow [ hodopile ](https://www.canva.com/design/DAFSCL9NslA/sZixWzNQxtQNZ0-h7OVaEw/view?utm_content=DAFSCL9NslA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### Landing Page
![](/public/imgs/screenshot.jpeg)

### MPV I - WireFrame
Version I
![Version I](/public/imgs/figma.jpeg)

[top](#hodopile)
## Deprecated

GH repo/code in GH Organization [HodoPile](https://github.com/HodoPile)

- Latest/Mantaned Code for HodoPile SSR App:  [hodopile_server2](https://github.com/HodoPile/hodopile_server2) 


- Frontend Repo/ ( [HodoPile](https://github.com/HodoPile/HodoPile) )
  - :( deprecated,  in favor of SSR

- Backend Repo/ ( [HodoPile_Server](https://github.com/HodoPile/HodoPile_Server) )
  - :( deprecated,  in favor of Server Side Rendered Architecture []()
  - [hodopile_server2](https://github.com/HodoPile/hodopile_server2)

[top](#hodopile)
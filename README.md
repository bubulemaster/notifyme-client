[![NotifyMe client logo](https://raw.githubusercontent.com/bubulemaster/notifyme-client/master/src/img/logo-big.png)]

# NotifyMe Offical Client

Big firm, slow communication ? Too many e-mail ? Mailing list issue ?

Forget it and allow your employee take power of our communication.

With NotifyMe allow all employee to create, publish on or subscribe on stream.

No administrator, no right, no workflow.

You employee can :
 * create stream if it want (for his projet, for automation process),
 * choice if he want substribe to a stream,
 * can unsubsbribe if he want and when he want.

# Developpement notice

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## How to learn all used framwork

 * Electron            : https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md
 * Aurelia             : https://github.com/aurelia-guides/aurelia-guides.md-articles/blob/master/Smallest-Aurelia-Application-created-from-scratch.md
 * Aurelia Http Client : http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/2
 * Aurelia Component   : http://www.tutorialspoint.com/aurelia/aurelia_custom_elements.htm
 * Aurelia Book        : https://leanpub.com/aurelia-for-real-world-applications
 * Semantic UI         : http://semantic-ui.com/introduction/getting-started.html or https://www.npmjs.com/package/semantic-ui
 * UI Design           : https://uxdesign.cc/design-better-forms-96fadca0f49c#.tlwxkul00
 * JSMP                : http://jspm.io/

## Tools needed

First, install [Node JS (LTS or Current)](https://nodejs.org/en/).

Clone repository.

Then, under command line, in repository folder :

   npm install electron -g
   npm install jspm -g
   npm install
   jspm install
   npm install babel-eslint -g
   npm install standard -g

## Git pre-commit hook

```
#!/bin/sh
# Ensure all javascript files staged for commit pass standard code style
git diff --name-only --cached --relative | grep '\.jsx\?$' | xargs standard
if [ $? -ne 0 ];
then
	cat <<\EOF

Error: Attempt to commit invalid JavaScript file.

Please fix them !
EOF
	exit 1
fi
```

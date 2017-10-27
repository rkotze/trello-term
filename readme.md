# Trello term

Simple terminal app to check trello cards assigned to you.

## Setup

### Dev

1. `git clone ...`
1. `npm i`
1. Run app: `npm start`

Need trello key and token and assigned to respective environment variables:

`TRELLO_API_KEY`, get here: https://trello.com/app-key

`TRELLO_API_TOKEN`, get here: https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=`TRELLO_API_KEY`

## MVP goal

Run a command in your terminal to view cards assigned to you in a `board` -> `list`.

- Card Id
- Card title
- Card link

Make it easy to copy and paste for git commit messages.

## Next objectives

- Setup custom commands to access different boards 
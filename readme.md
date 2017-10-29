# Trello term

Simple terminal app to check trello cards assigned to you on a board.

~~`npm install ttrello -g`~~ still to be published

## Commands

Terminal help `ttrello -h` or for commands `ttrello mycards -h`.

`ttrello mycards|mc [options] <username> <idBoard> [codePrefix]`

Example:

```
$ ttrello mycards someUsername j800nsixa CARDID
LIST list name
 CARD card title
      CARDID123 shortUrl
```

**Where** can I find `idBoard`? In the Trello url: https://trello.com/b/**idBoard**/board-name

## Dev setup

1. `git clone ...`
1. `npm i`
1. Run app: `npm start`
1. Try shell command: `npm link` -> now `ttrello` is available.

Trello key and token and required to access boards. 

Environment variables:

`TRELLO_API_KEY` = get here: https://trello.com/app-key

`TRELLO_API_TOKEN` = get here: https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Trello%20Terminal&key=`TRELLO_API_KEY`

## MVP goal

Run a command in your terminal to view cards assigned to you in a `board` -> `list`.

- Card Id
- Card title
- Card link

Make it easy to copy and paste for git commit messages.

## Next objectives

- Setup custom commands to access different boards 
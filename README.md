You can generate a react app with typscript by following the directions here: [Generate a React app with typescript instructions](https://facebook.github.io/create-react-app/docs/adding-typescript)

I tried both

```
yarn create react-app my-app --typescript
```

and

```
npx create-react-app my-app --typescript
```

the `yarn` version of the command had some verions issues that I did not fully resolve but the `npx` command worked just fine (there seems to currently be some issue if you are using node 12)

After generating the react application, it should have a README.md with instructions on how to run and test the app. (Also after you create the app, various commands will be displayed in the terminal)

---

Congratulations on a react-typescript application

A few things to try:

Go to the root directory of react app and start it
Next navigate to src/App.tsx
Try editing some of the text, save the file, and your change should be automatically reflected in the ui
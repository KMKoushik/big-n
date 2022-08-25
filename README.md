<p align="center">
  <img width="128" height="128" src="/src/public/BigNumberLogo128.png?raw=true">
</p>


# A browser extension to quickly convert Big numbers (wei) to Ether and vice versa

Ever frustrated when etherscan or any frontend shows number in wei and you need to convert it to ether quickly? Well this extension will solve that effectively.

<img width="1280" alt="big-n" src="https://user-images.githubusercontent.com/24666922/186257317-61ec4b4b-6c95-4222-8c98-af36f62e2ea8.png">


Supported Features
- Select any big number and press Alt+B (win) / option+B (mac)  to convert it to Ether
- By default it uses 18 decimals, but you can convert to any decimal you want
- Convert small number (Ether) to big number (wei)

## Local setup

- Install npm packages
```sh
yarn i
```

- Start local server
```sh
yarn start
```

- Install extension to chrome 
  - Go to chrome://extensions/
  - Click on load unpacked
  - Select dist folder under the repo


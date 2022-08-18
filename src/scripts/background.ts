import browser from 'webextension-polyfill'

console.log(browser)


browser.commands.onCommand.addListener((command, tab) => {
  if (tab?.id) {
    console.log(`Command "${command}" called`, tab?.id as number);
    browser.tabs.sendMessage(tab.id, { command }).then(console.log)
  }
});

// import evsComponent from '@evs-pc/evs-ui-pro'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setupCustomComponents = (app?): void => {
  const files = require.context('../components/', true, /\.(vue|jsx|tsx)$/)
  // app.use(evsComponent)
  files.keys().forEach((key) => {
    const config = files(key)
    const name = key
      .replace(/^\.\//, '')
      .replace(/\.\w+$/, '')
      .split('/')[0]

    app.component(name, config.default || config)
  })
}

export function configure (aurelia) {
  aurelia.use
    .basicConfiguration()
    .developmentLogging()
    .globalResources(
      './src/templates/login/login',
      './src/templates/client/client',
      './src/templates/talk/talk',
      './src/templates/setup/setup',
      './src/templates/streams/streams',
      './src/filters/filter-value-converter'
    )

  aurelia.start().then(() => aurelia.setRoot())
}

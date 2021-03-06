// tslint:disable: no-console
import { makeCalls } from './utils/clientHttp';
import config, { KnownConfigKey } from './utils/config';
config.init();
import { app } from './app';

const port = Number(config.get(KnownConfigKey.ServerPort));
app.set('port', port);

app.listen(app.get('port'), () => {
  const address = `http://localhost:${app.get('port')}`;
  console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env')), makeCalls(address);
});

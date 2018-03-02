import devStore from './configureStore.dev';
import prodStore from './configureStore.prod';

if (process.env.NODE_ENV === 'production') {
  module.exports = prodStore;
} else {
  module.exports = devStore;
}

import devStore from './configureStore.dev';
import prodStore from './configureStore.prod';

export default process.env.NODE_ENV === 'production' ? prodStore : devStore;

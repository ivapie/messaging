import { signIn, signOut } from '../../actions'

export default class Login {
    constructor (store) {
        this.store = store;
        this.value = null;
        this.init();
    }
    init(){ 
        this.store.dispatch({ type: 'SIGN_IN', payload: {token: "1",name: "adasdsd",email: "3"} });
        console.log(this.store.getState())
    }

    render(){
        return `<a href='/' data-page="/">Login</a>`;
    }
};
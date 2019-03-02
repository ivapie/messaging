import store from './store'
import { Login, Homepage } from './components'

class Siru {
    constructor() {
        // Components
        this.LoginComponent = new Login(store).render();
        this.HomepageComponent = new Homepage(store).render();
        // Routes
        this.routes = {
            '/login': this.LoginComponent,
            '/': this.HomepageComponent
        }
        // Events
        this.events = this.events.bind(this);
        this.push = this.push.bind(this);
        this.start = this.start.bind(this);
        // DOM
        this.app = document.getElementById('app');
        this.app.innerHTML = this.routes[window.location.pathname];
        // Start
        this.start();
    }
        
    push(pathName) {
        window.history.pushState(
            {},
            pathName,
            window.location.origin + pathName
        );
        this.app.innerHTML = this.routes[pathName];
    }

    events() {
        let self = this;
        self.app.addEventListener('click', function (e) {
            if (e.target != e.currentTarget) {
                e.preventDefault();
                self.push(e.target.dataset.page)
            }
            e.stopPropagation();
        }, false);

        window.onpopstate = () => {
            self.app.innerHTML = self.routes[window.location.pathname];
        }
    }
    
    start(){
        this.events();
    }
}

const app = new Siru();
app


Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});


const today = new Date();
class Projects {
    constructor(title, subtitle, time) {
        this.title = title;
        this.subtitle = subtitle;
        this.time = time;
    }
}

class MainRender {
    status = false;
    renderr(item, key) {
        const li = document.createElement("li");
        const template = document.getElementById("templ");
        const templateBody = document.importNode(template.content, true)//template method to add none-preconfigured html
        templateBody.querySelector("h4").textContent = item.title;
        templateBody.querySelector("p").textContent = item.subtitle;
        // template.append(templateBody);
        // li.innerHTML = ` 
        // <h4>${item.title}</h4>
        // <p>${item.subtitle}</p>
        // `;
        const more = document.createElement("button");
        const finish = document.createElement("button");
        finish.className = "second";
        more.className = "first";
        finish.innerText = key;
        more.innerText = "More Info";
        li.append(templateBody);
        li.append(more);
        li.append(finish);
        // li.dataset.fun = item.title;//just added a dataset to DOM element
        finish.addEventListener('click', this.transfer.bind(item, li));
        more.addEventListener('click', this.more.bind(null, item, li));
        more.addEventListener('mouseenter', this.rest);
        return li;
    }
    more = (item, li) => {
        // console.log(li.dataset.fun);//the way dataset could be accessible
        if (this.status === false) {

            const extra = document.createElement("h5");
            extra.style.cursor = "pointer";
            extra.innerText = item.time;
            li.append(extra);
            extra.addEventListener('click', this.hide.bind(null, extra));
            this.status = true;
        }
    }
    // moreNew = (item,li,event)=>{//whit event target approach
    //     console.log(event,item,li)
    //     const extra = document.createElement("h5");
    //     extra.style.cursor = "pointer";
    //     extra.innerText = item.time;
    //     li.append(extra);
    //     event.target.disabled = true;
    //     extra.addEventListener('click',this.hide.bind(this,extra));

    // }

    hide = (extra, event) => {
        extra.remove();
        // event.target.disabled = false;
        this.status = false;
        // setTimeout(()=>{extra.removeEventListener("click",this)},2000)
    }
    rest = (event) => {
        console.log(event);
    }
}

class Genrator extends MainRender {
    items = [
        new Projects("Buy Groceries", "Dont forget to pick up groceries today.", today),
        new Projects("Buy ", "Dont forget to pick up groceries today.", today)
    ];
    static projects = [];

    render() {
        const main = document.getElementById("main");
        for (const item of this.items) {
            const prp = this.renderr(item, "finish");
            main.append(prp);
        }
    };
    transfer(element) {
        const handel = new Swap();
        element.remove();
        // element.style.display = "none";
        handel.elements.push(this);
        handel.rerender();

    }

    returned() {
        const main = document.getElementById("main");
        for (const el of Genrator.projects) {
            const prp = this.renderr(el, "finish");
            main.append(prp);
            Genrator.projects.pop();
        }
    }

    static get() {
        const test = document.createElement("script");
        test.src = "./test.js";
        test.defer = true;
        document.head.append(test);
    }

}
class Swap extends MainRender {
    elements = [];
    rerender() {
        const secondMain = document.getElementById("second-main");
        for (const el of this.elements) {
            const prp = this.renderr(el, "active");
            secondMain.append(prp);
            this.elements.pop();
        }
    }
    transfer(element) {
        const handel = new Genrator();
        element.remove();
        // element.style.display = "none";
        Genrator.projects.push(this);
        handel.returned();
    }
}

const og = new Genrator();
og.render();



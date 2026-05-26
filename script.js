document.addEventListener('DOMContentLoaded', () =>{

    setInterval(() => {
            const datetime = document.getElementById('datetime');
            let date = new Date()
            datetime.innerHTML = `Сегодня ${date.toLocaleDateString('ru-KZ')}<br>Время: ${date.toLocaleTimeString('ru-KZ')}`} ,500);

    const buttonHtml = document.getElementById('btn')
    const textHtml = document.getElementById('box')
    const text2 = 'На этом обучении вы узнаете, как эффективно управлять своим временем. Мы расскажем о разных способах планирования, в том числе о технике Pomodoro, при которой нужно работать 25 минут, а затем делать перерыв на 5 минут. Вы научитесь соблюдать режим работы и отдыха, чтобы меньше уставать, лучше концентрироваться и использовать своё время с пользой.';
    const text1 = 'Этот курс поможет вам научиться правильно распределять своё время и использовать технику Pomodoro: 25 минут работы и 5 минут отдыха.'
    let trufal = false;
    function changetextHtml() {
        if(!trufal) {
            textHtml.innerHTML = `${text2} <button type="button" id="btn">Меньше информации</button>`;
            trufal = true;
        } else {
            textHtml.innerHTML = `${text1} <button type="button" id="btn">Больше информации</button>`;
            trufal = false;
        }
        document.getElementById('btn').addEventListener('click', changetextHtml);
        }
    buttonHtml.addEventListener('click', changetextHtml);
    
    const taskform = document.getElementById('taskform')  
    const taskholder = document.getElementById('taskholder')
    const task = document.getElementById('task') 


    taskform.addEventListener('submit', (e) => {
        e.preventDefault();
        addTasks(taskholder.value);
        taskholder.value = '';
        timertask.value = '';
    })
    function addTasks(t){
        const type = document.getElementById('typetask').value;
        const priority = document.getElementById('priority').value;
        let time = document.getElementById('timertask').value * 60;
        const soundtimer = new Audio('soundtimer.mp3');
        const li = document.createElement('li');
        const textli = document.createElement('span');
        textli.textContent = `Задание: '${t}' `;

        const infoli = document.createElement('span');

        function updateTimer() {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            infoli.textContent = `  || Тип: ${type} || Приоритет: ${priority} || Осталось: ${minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
            if (seconds == 15 && minutes == 0){
                soundtimer.play()
            }
            if (time > 0) {
                time--;
            } else {
                clearInterval(interval);
                li.style.textDecoration = 'line-through'
                li.style.color = 'Green'
            }
        }

    let interval = setInterval(updateTimer, 1000);
    updateTimer();

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    let checkboxtr = false
    checkbox.addEventListener('click', () => {
        if(!checkboxtr){
            li.style.textDecoration = 'line-through'
            li.style.color = 'Green'
            clearInterval(interval)
            checkboxtr = true
        } else {
            alert('Задание уже выполнена')
        }

    })

    const delbtn = document.createElement('img');
    delbtn.src = 'delete.png';

    delbtn.addEventListener('click', () => {
        clearInterval(interval);
        li.remove();
    });

    const pausebtn = document.createElement('img');
    pausebtn.src = 'pause.png';
    pausebtn.style.cursor = 'pointer';
    pausebtn.style.width = '24px';
    isPaused = false

    pausebtn.addEventListener('click', () => {
        if(!isPaused){
            pausebtn.src = 'start.png'
            clearInterval(interval)
            isPaused = true
        }else {
            pausebtn.src = 'pause.png'
            interval = setInterval(updateTimer, 1000);
            isPaused = false
        }
    });

    li.appendChild(checkbox);
    li.appendChild(textli);
    li.appendChild(infoli);
    li.appendChild(delbtn);
    li.appendChild(pausebtn);

    document.getElementById('task').appendChild(li);
}  

    const dwork = document.getElementById("workdiagram")
    const dstudy = document.getElementById("studydiagram")
    const drest = document.getElementById("restdiagram")
    const dsport = document.getElementById("sportdiagram")
    const dgame = document.getElementById("gamediagram")
    const diagramform = document.getElementById('diagram')
    const diagram = document.getElementById('diagramma')
    const productiv = document.createElement('div')
    const unproductiv = document.createElement('div')

    diagramform.addEventListener('submit', (e) => {
        e.preventDefault()
        diagram.innerHTML = '';
        const work = +dwork.value
        const study = +dstudy.value
        const rest = +drest.value
        const sport = +dsport.value
        const game = +dgame.value

        let average = work + study + rest + sport + game

        if (average >= 24) {
            alert("Значение не может быть больше 24 часов")
            return
        }

        function diagramfull(value, color, text) {
            const a1 = document.createElement('div')
            a1.style.marginLeft = '5px'

            const a2 = document.createElement('div')
            a2.classList.add('a2')
            a2.style.height = (value * 14) + 'px'
            a2.style.backgroundColor = color
            a2.textContent = value

            const a3 = document.createElement('div')
            a3.classList.add('a3')
            a3.textContent = text

            a1.appendChild(a2)
            a1.appendChild(a3)

            return a1
        }
        function produnprod(color, text) {
            let b1 = work + study + sport 
            let b2 = rest + game

            const a4 = document.createElement('div')
            a4.style.marginRight = '20px'
            const a42 = document.createElement('div')

            const a5 = document.createElement('div')
            a5.classList.add('a4')
            a5.style.height = (b1 * 14) + 'px'
            a5.style.backgroundColor = color
            a5.textContent = b1

            const a52 = document.createElement('div')
            a52.classList.add('a4')
            a52.style.height = (b2 * 14) + 'px'
            a52.style.backgroundColor = color
            a52.textContent = b2

            const a6 = document.createElement('div')
            a6.classList.add('a3')
            a6.textContent = 'Продуктивный'
            const a62 = document.createElement('div')
            a62.classList.add('a3')
            a62.textContent = 'Не продуктив.'

            a4.appendChild(a5)
            a4.appendChild(a6)
            a42.appendChild(a52)
            a42.appendChild(a62)
            const wrapper = document.createElement('div');
            wrapper.classList.add('diagramrow')
            wrapper.appendChild(a4);
            wrapper.appendChild(a42);

            return wrapper;
        }

        diagram.appendChild(diagramfull(work, 'blue', 'Работа'))
        diagram.appendChild(diagramfull(study, 'green', 'Учёба'))
        diagram.appendChild(diagramfull(rest, 'gray', 'Отдых'))
        diagram.appendChild(diagramfull(sport, 'purple', 'Спорт'))
        diagram.appendChild(diagramfull(game, 'red', 'Игры'))
        const line = document.createElement('hr')
        diagram.appendChild(line)
        diagram.appendChild(produnprod('aqua'))
    })

    const pomodorotext = "Pomodoro Technique — это популярный метод управления временем, при котором работа разбивается на короткие интервалы, обычно по 25 минут, с обязательными перерывами по 5 минут.\nГлавная идея метода заключается в том, чтобы полностью сосредоточиться на задаче в течение одного интервала и не отвлекаться.\nПосле каждых четырёх таких циклов рекомендуется делать более длинный перерыв от 15 до 30 минут.\nЭтот подход помогает поддерживать высокий уровень концентрации и предотвращает переутомление.\nМетод особенно полезен для выполнения сложных или неприятных задач, так как снижает психологический барьер перед началом работы.\nКроме того, Pomodoro помогает лучше контролировать время и видеть, сколько усилий уходит на конкретные задачи.\nРегулярное использование этой техники развивает дисциплину и улучшает продуктивность в долгосрочной перспективе.";
    const gtdtext = "Getting Things Done (GTD) — это система управления задачами, разработанная для повышения личной продуктивности и снижения стресса.\nОсновной принцип заключается в том, чтобы выгрузить все задачи, идеи и планы из головы во внешнюю систему, например список или приложение.\nСначала все дела фиксируются, затем анализируются и распределяются по категориям: что нужно сделать сейчас, позже или делегировать.\nБольшие и сложные задачи разбиваются на более мелкие и понятные шаги.\nТакже важно регулярно пересматривать список задач, чтобы поддерживать его актуальность.\nGTD помогает освободить ум от постоянного запоминания дел и сосредоточиться на их выполнении.\nЭта система делает рабочий процесс более организованным и предсказуемым.\nВ результате человек меньше отвлекается, быстрее принимает решения и эффективнее достигает своих целей.";
    const paretotext = "Pareto Principle, также известный как правило 80/20, — это концепция, согласно которой примерно 80% результатов достигается благодаря 20% усилий.\nЭтот принцип широко используется в бизнесе, обучении и повседневной жизни для повышения эффективности.\nСуть заключается в том, чтобы определить наиболее важные действия, которые приносят наибольший результат, и сосредоточиться именно на них.\nОстальные задачи часто оказываются менее значимыми и могут отнимать много времени без ощутимой пользы.\nПрименение этого принципа позволяет оптимизировать рабочий процесс и сократить лишние действия.\nНапример, из списка из 10 задач обычно только 2–3 действительно влияют на итоговый результат.\nЕсли уделять им приоритетное внимание, можно значительно повысить продуктивность.\nТаким образом, правило 80/20 помогает работать умнее, а не больше, достигая лучших результатов с меньшими затратами времени и сил.";
    const texttechnic = document.getElementById('texttech');

    function showText(text) {
        texttechnic.classList.remove('show')

        setTimeout(() => {
            texttechnic.innerHTML = text
            texttechnic.classList.add('show')
        }, 200)
    }

    document.getElementById('pomodoro').addEventListener('click', () =>{
        texttechnic.innerHTML = showText(pomodorotext)
    })
    document.getElementById('gtd').addEventListener('click', () =>{
        texttechnic.innerHTML = showText(gtdtext)
    })
    document.getElementById('pareto').addEventListener('click', () =>{
        texttechnic.innerHTML = showText(paretotext)
    })
})
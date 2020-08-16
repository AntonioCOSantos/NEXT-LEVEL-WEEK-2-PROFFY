const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // inserir dados
        proffyValue = {
            name: "Antonio Santos",
            avatar:"https://avatars0.githubusercontent.com/u/68483780?s=460&u=05b4accec98b09459c5d061465a784196f05188d&v=44" ,
            whatsapp: "12997232029", 
            bio:"Hi guys, I'm Antonio, at the beginning of the full stack developer, starting with JS, CSS3, HTML5, React, I hope I can help in the best way.",
    }

        classValue = {
            subject: 1, 
            cost: "50", 
        }
            //o proffy id vira pelo banco de dados

        classScheduleValues = [
            //class_id vira pelo banco de dados após cadastrarmos a class
            {
                weekday: 1,
                time_from: 720,
                time_to: 1220
            },
            {
                weekday: 0,
                time_from: 520,
                time_to: 1220
            }
        ]
        
        await createProffy(db, {proffyValue, classValue, classScheduleValues })
    //consultar dados inseridos

    const selectedProffys = await db.all("SELECT * FROM proffys")
   // console.log(selectedProffys)
    //consultar  as classes de um determinado professor
    //e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.* , proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    //o horario que a pessoa trabalha, por exemplo, é das 8h -18h
    //o horario do time_from (8h) precisa ser menor ou igual ao horario  solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "720"
        AND class_schedule.time_to > "900"
    `)
    //console.log (selectClassesSchedules)
})
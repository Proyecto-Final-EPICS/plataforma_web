const STUDENTS = [
    {
        firstname: 'Miralem',
        lastname: 'Pjanic',
        numDoc: '001',
        course: 'C01',
    },
    {
        firstname: 'Johana',
        lastname: 'White',
        numDoc: '003',
        course: 'C02',
    },
    {
        firstname: 'Diana',
        lastname: 'Ramírez',
        numDoc: '004',
        course: 'C03',
    },
    {
        firstname: 'Francisco',
        lastname: 'Trincao',
        numDoc: '002',
        course: 'C02',
    },
];

const GAMES = [
    {
        code: 'secube',
        name: 'Secube',
    },
    {
        code: 'verb-to-be',
        name: 'Verb to Be',
    },
    {
        code: 'restaurant',
        name: 'Restaurant',
    },
    {
        code: 'phrases',
        name: 'Phrases',
    },
]

export default function genSessionGame() {
    
    const res = [];
    for(let j = 0; j < 100; j++) {
        const now = new Date().getTime();
        const startTime = now - Math.random() * 365 * 24 * 3600 * 1000;
        const endTime = startTime + Math.random() * 2 * 3600 * 1000;

        const games = [];
        GAMES.forEach(g => {
            if(Math.random() >= 0.5) return;
            const game = {...g};
            
            const levels = Array(1 + parseInt(Math.random() * 10));
            for(let i = 0; i < levels.length; i++) {
                const level = 1 + parseInt(Math.random() * 10);
                const num_right_ans = 1 + parseInt(Math.random() * 100);
                const num_fails = 100 - num_right_ans;
                const accuracy = num_right_ans / 100;
                const winLevel = Math.random() >= 0.5;

                levels[i] = {level, num_right_ans, num_fails, accuracy, winLevel};
            }
            game.levels = levels;
            games.push(game);
        })

        res.push({
            student: STUDENTS[parseInt(Math.random() * STUDENTS.length)],
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            games,
        });
    }

    console.log(JSON.stringify(res));
}

const grid = document.getElementById('mood-grid');
const displayJp = document.getElementById('selected-emotion-jp');
const displayEn = document.getElementById('selected-emotion-en');
const memoInput = document.getElementById('memo-input');
const saveBtn = document.getElementById('save-btn');
const shareBtn = document.getElementById('share-btn');
const historyList = document.getElementById('history-list');

let currentSelection = null;

const emotions = {
    "10-1": ["忙しい", "Engaged"], "10-2": ["うろたえる", "Panicked"], "10-3": ["ストレス強", "Stressed"], "10-4": ["神経質", "Jittery"], "10-5": ["衝撃的", "Shocked"],
    "10-6": ["驚き", "Surprised"], "10-7": ["陽気", "Upbeat"], "10-8": ["祭り気分", "Festive"], "10-9": ["ウキウキ", "Exhilarated"], "10-10": ["有頂天", "Ecstatic"],
    "9-1": ["激怒", "Livid"], "9-2": ["憤慨", "Furious"], "9-3": ["落胆", "Frustrated"], "9-4": ["張り詰めた", "Tense"], "9-5": ["あ然", "Stunned"],
    "9-6": ["興奮", "Hyper"], "9-7": ["愉快", "Cheerful"], "9-8": ["やる気満々", "Motivated"], "9-9": ["触発された", "Inspired"], "9-10": ["大喜び", "Elated"],
    "8-1": ["爆発寸前", "Fuming"], "8-2": ["おびえる", "Frightened"], "8-3": ["怒り", "Angry"], "8-4": ["高ぶる", "Nervous"], "8-5": ["落ち着かない", "Restless"],
    "8-6": ["精力的", "Energized"], "8-7": ["生き生き", "Lively"], "8-8": ["興奮", "Excited"], "8-9": ["楽観的", "Optimistic"], "8-10": ["熱狂的", "Enthusiastic"],
    "7-1": ["不安", "Anxious"], "7-2": ["危惧", "Apprehensive"], "7-3": ["心配", "Worried"], "7-4": ["うわついた", "Irritated"], "7-5": ["いらいら", "Annoyed"],
    "7-6": ["うれしい", "Pleased"], "7-7": ["集中", "Focused"], "7-8": ["幸せ", "Happy"], "7-9": ["誇り", "Proud"], "7-10": ["ぞくぞく", "Thrilled"],
    "6-1": ["嫌悪", "Repulsed"], "6-2": ["当惑", "Troubled"], "6-3": ["憂慮", "Concerned"], "6-4": ["そわそわ", "Uneasy"], "6-5": ["もどかしい", "Peeved"],
    "6-6": ["快適", "Pleasant"], "6-7": ["楽しい", "Joyful"], "6-8": ["希望あり", "Hopeful"], "6-9": ["遊び心", "Playful"], "6-10": ["至福", "Blissful"],
    "5-1": ["うんざり", "Disgusted"], "5-2": ["ふさぎこむ", "Glum"], "5-3": ["期待外れ", "Disappointed"], "5-4": ["落ち込む", "Down"], "5-5": ["無感情", "Apathetic"],
    "5-6": ["気楽", "At Ease"], "5-7": ["のんびり", "Easygoing"], "5-8": ["満足", "Content"], "5-9": ["愛情", "Loving"], "5-10": ["充実", "Fulfilled"],
    "4-1": ["悲観的", "Pessimistic"], "4-2": ["気難しい", "Morose"], "4-3": ["気を落とす", "Discouraged"], "4-4": ["悲しい", "Sad"], "4-5": ["つまらない", "Bored"],
    "4-6": ["穏やか", "Calm"], "4-7": ["安心", "Secure"], "4-8": ["満ち足りた", "Satisfied"], "4-9": ["感謝", "Grateful"], "4-10": ["感動", "Touched"],
    "3-1": ["疎外感", "Alienated"], "3-2": ["悲惨", "Miserable"], "3-3": ["孤独", "Lonely"], "3-4": ["がっかり", "Disheartened"], "3-5": ["疲れた", "Tired"],
    "3-6": ["リラックス", "Relaxed"], "3-7": ["ゆっくり", "Chill"], "3-8": ["休まる", "Restful"], "3-9": ["恵まれている", "Blessed"], "3-10": ["安定", "Balanced"],
    "2-1": ["しょんぼり", "Despondent"], "2-2": ["意気消沈", "Depressed"], "2-3": ["不機嫌", "Sullen"], "2-4": ["消耗", "Exhausted"], "2-5": ["疲労感", "Fatigued"],
    "2-6": ["まったり", "Mellow"], "2-7": ["考え中", "Thoughtful"], "2-8": ["平然", "Peaceful"], "2-9": ["心地良い", "Comfortable"], "2-10": ["のんき", "Carefree"],
    "1-1": ["絶望", "Despairing"], "1-2": ["望み薄", "Hopeless"], "1-3": ["みじめ", "Desolate"], "1-4": ["ヘトヘト", "Spent"], "1-5": ["疲れ切った", "Drained"],
    "1-6": ["眠い", "Sleepy"], "1-7": ["無関心", "Complacent"], "1-8": ["冷静", "Tranquil"], "1-9": ["くつろぎ", "Cozy"], "1-10": ["平穏", "Serene"]
};

for (let y = 10; y >= 1; y--) {
    for (let x = 1; x <= 10; x++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        let color = x <= 5 ? (y > 5 ? `hsl(0, 75%, ${90-(y-5)*6}%)` : `hsl(210, 60%, ${95-(5-y)*6}%)`) : (y > 5 ? `hsl(40, 90%, ${90-(y-5)*6}%)` : `hsl(140, 50%, ${90-(5-y)*6}%)`);
        cell.style.backgroundColor = color;
        cell.onclick = () => {
            const data = emotions[`${y}-${x}`];
            currentSelection = { jp: data[0], en: data[1], color: color };
            displayJp.innerText = data[0]; displayEn.innerText = data[1];
            saveBtn.disabled = false;
            document.querySelectorAll('.cell').forEach(c => c.style.border = "none");
            cell.style.border = "2px solid #333";
        };
        grid.appendChild(cell);
    }
}

saveBtn.onclick = () => {
    const log = { id: Date.now(), date: new Date().toLocaleString('ja-JP'), emotion: currentSelection.jp, memo: memoInput.value || "（なし）", color: currentSelection.color };
    const logs = JSON.parse(localStorage.getItem('moodLogs') || '[]');
    logs.unshift(log); localStorage.setItem('moodLogs', JSON.stringify(logs));
    memoInput.value = ""; render();
};

function render() {
    const logs = JSON.parse(localStorage.getItem('moodLogs') || '[]');
    historyList.innerHTML = logs.map(l => `<div class="history-item" style="border-left-color: ${l.color}"><div><div class="time">${l.date}</div><div class="emotion-name">${l.emotion}</div><div class="memo">${l.memo}</div></div><button class="delete-btn" onclick="deleteLog(${l.id})">削除</button></div>`).join('');
}

window.deleteLog = (id) => { if(confirm("消去しますか？")) { let logs = JSON.parse(localStorage.getItem('moodLogs') || '[]'); logs = logs.filter(l => l.id !== id); localStorage.setItem('moodLogs', JSON.stringify(logs)); render(); } };

shareBtn.onclick = async () => {
    const logs = JSON.parse(localStorage.getItem('moodLogs') || '[]');
    if(logs.length === 0) return alert("記録がありません");
    const text = "【教えてカメさん 感情日記】\n\n" + logs.map(l => `${l.date}\n感情：${l.emotion}\nメモ：${l.memo}\n----------------`).join('\n\n');
    
    if (navigator.share) {
        try { await navigator.share({ title: '教えてカメさん記録', text: text }); } catch (e) { console.log("共有中断"); }
    } else {
        try {
            await navigator.clipboard.writeText(text);
            alert("全記録をコピーしました！メモ帳等に貼り付けて保存してください。");
        } catch (err) {
            alert("コピーに失敗しました。");
        }
    }
};

render();

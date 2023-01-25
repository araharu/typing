//テキスト(問題文)表示編

//変数の用意（初期化）
let untyped = '';
let typed = '';
let score = 0;


//idを指定してHTMLを取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

//問題文のテキストリストを用意
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
];

//ランダムなテキストを表示させる関数を作成
const createText = () => {
    //タイピングしたテキストを初期化
    typed = '';
    typedfield.textContent = typed;
    //ランダムな数値の生成
    let random= Math.floor(Math.random() * textLists.length);
    //配列にランダムを
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

//関数を使用
// createText();



//キー入力判定編

//イベントオブジェクトからキー入力の情報を取得する関数を作成
const keyPress = e => {
    //誤タイプの場合、returnで処理を終了する。
    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add('mistyped');
        //200ms後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        },200);
        return;
    }

    //正タイプの場合
    //スコアに+1
    score++;
    // typed(正解テキストにuntypedの頭文字を足す)
    typed += untyped.substring(0, 1);
    //untypedを頭文字が抜けたものに代入し直す
    untyped = untyped.substring(1);
    //上書き保存的な
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    //新しいテキストを表示
    if(untyped === ''){
        //関数
        createText();
    }
};

const rankCheck = score =>{
    let text = '';
    if(score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
       } else if(score < 200) {
         text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
       } else if(score < 300) {
         text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
       } else if(score >= 300) {
         text = `あなたのランクはSです。\nおめでとうございます!`;    
       }
      
       // 生成したメッセージと一緒に文字列を返す
       return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

//ゲームオーバー時の関数作成
const gameOver = id =>{
    // カウントが0になったらタイマーを停止する
   clearInterval(id);
   const result = confirm(rankCheck(score));

   //okボタンでリロード
   if(result <= true){
    window.location.reload();
   }
};

//カウントダウンタイマー関数
const timer = () => {
    // タイマー部分のHTML要素（p要素）を取得する
   let time = count.textContent;
   const id = setInterval(() => {
   // カウントダウンする
    time--;
    count.textContent = time;

    // ゲームを終了
     if(time == 0) {
        gameOver(id);
      }
    }, 1000);
};

//startボタンの処理
//clickでイベント処理、関数を行う
start.addEventListener('click',() => {
    //タイマースタート関数
    timer();
    //ランダムなテキスト表示
    createText();
    //スタートボタンを非表示
    start.style.display = 'none';
    //キー入力された時関数keyPressを発生させるイベント処理
    document.addEventListener('keypress',keyPress);

});

//初期画面(untypedfield)のテキスト
untypedfield.textContent = 'startボタンで開始 \n （大文字、スペースも判定されます。 \n 改行の判定はありません。スペースの場合があるので注意してください。）';
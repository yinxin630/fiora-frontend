'use strict'

const React = require('react');

const expressions = ['呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
                     '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心', 
                     '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
                     '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳',
                     '钱币', '灯泡', '咖啡', '蛋糕', '音乐', 'haha', '胜利', '大拇指', '弱', 'ok'];

export default class ExpressionForm extends React.Component {
    render () {
        const { handleClick } = this.props;
        let { isShow } = this.props;
        
        return (
            <div style={{
                width: 40 * 10,
                height: 40 * 5,
                position: 'absolute',
                bottom: 60,
                left: 100,
                display: isShow ? 'flex' : 'none',
                flexWrap: 'wrap',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 0px 15px #666666',
            }}>
            {
                expressions.map((e, index) => {
                    return (
                        <div key={ index } style={{
                            width: 40,
                            height: 40,
                            padding: 5,
                            borderCollapse: 'collapse',
                            border: 'solid 1px #e3e3e3',
                        }} onClick={ () => handleClick(`#(${e})`) }>
                            <div style={{
                                width: 30,
                                height: 30,
                                backgroundPosition: `left ${-30 * index}px`,
                                backgroundImage: 'url(./images/expressions.png)',
                                backgroundRepeat: 'no-repeat',
                            }}/>
                        </div>
                    );
                })
            }
            </div>
        );
    }
}
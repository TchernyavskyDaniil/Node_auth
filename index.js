var _0x9268 = ['Unknown\x20message\x20type', 'data', 'email', 'password', 'utc', 'add', 'days', 'format', 'YYYY-MM-DDTHH:mm:ss', 'Wrong\x20email\x20or\x20password', 'customer.not.found', 'format.exception', 'uuid', 'moment', 'Server', '123123', 'connection', 'message', 'parse', 'stringify', 'CUSTOMER_ERROR', 'Wrong\x20message\x20format', 'send', 'sequence_id'];
(function(_0x499dd9, _0x4483fd) {
    var _0x3cbbdb = function(_0x24534c) {
        while (--_0x24534c) {
            _0x499dd9['push'](_0x499dd9['shift']());
        }
    };
    _0x3cbbdb(++_0x4483fd);
}(_0x9268, 0x1a4));
var _0x8926 = function(_0xcd668a, _0x50c2da) {
    _0xcd668a = _0xcd668a - 0x0;
    var _0x592f76 = _0x9268[_0xcd668a];
    return _0x592f76;
};
const WebSocket = require('ws');
const uuid = require(_0x8926('0x0'));
const moment = require(_0x8926('0x1'));
const wss = new WebSocket[(_0x8926('0x2'))]({
    'port': 0x1f90
});
var apiToken = ![];
var connection = null;
const correctEmail = 'correct-email@example.com';
const correctPassword = _0x8926('0x3');
wss['on'](_0x8926('0x4'), _0x39195c => {
    connection = _0x39195c;
    connection['on'](_0x8926('0x5'), _0x5e57e2 => {
        let _0x4bc6e7;
        try {
            _0x4bc6e7 = JSON[_0x8926('0x6')](_0x5e57e2);
        } catch (_0x154d27) {
            let _0x66e5a6 = JSON[_0x8926('0x7')]({
                'type': _0x8926('0x8'),
                'sequence_id': uuid['v4'](),
                'data': {
                    'error_description': _0x8926('0x9'),
                    'error_code': 'format.exception'
                }
            });
            _0x39195c[_0x8926('0xa')](_0x66e5a6);
            return;
        };
        let _0x18d1a8 = !!_0x4bc6e7[_0x8926('0xb')] ? _0x4bc6e7[_0x8926('0xb')] : uuid['v4']();
        if (_0x4bc6e7['type'] !== 'LOGIN_CUSTOMER') {
            let _0x4fb87f = JSON[_0x8926('0x7')]({
                'type': _0x8926('0x8'),
                'sequence_id': uuid['v4'](),
                'data': {
                    'error_description': _0x8926('0xc'),
                    'error_code': 'unknown.message.type'
                }
            });
            _0x39195c['send'](_0x4fb87f);
            return;
        }
        if (_0x4bc6e7[_0x8926('0xd')] && !!_0x4bc6e7[_0x8926('0xd')][_0x8926('0xe')] && !!_0x4bc6e7[_0x8926('0xd')]['password']) {
            if (_0x4bc6e7[_0x8926('0xd')][_0x8926('0xe')] === correctEmail && _0x4bc6e7[_0x8926('0xd')][_0x8926('0xf')] === correctPassword) {
                apiToken = uuid['v4']();
                let _0x2d6e4f = JSON[_0x8926('0x7')]({
                    'type': 'CUSTOMER_API_TOKEN',
                    'sequence_id': _0x18d1a8,
                    'data': {
                        'api_token': apiToken,
                        'api_token_expiration_date': moment[_0x8926('0x10')]()[_0x8926('0x11')](0x3, _0x8926('0x12'))[_0x8926('0x13')](_0x8926('0x14')) + 'Z'
                    }
                });
                _0x39195c[_0x8926('0xa')](_0x2d6e4f);
                return;
            } else {
                let _0x13f8be = JSON['stringify']({
                    'type': _0x8926('0x8'),
                    'sequence_id': _0x18d1a8,
                    'data': {
                        'error_description': _0x8926('0x15'),
                        'error_code': _0x8926('0x16')
                    }
                });
                _0x39195c[_0x8926('0xa')](_0x13f8be);
            }
        } else {
            let _0x3df964 = JSON[_0x8926('0x7')]({
                'type': _0x8926('0x8'),
                'sequence_id': _0x18d1a8,
                'data': {
                    'error_description': _0x8926('0x9'),
                    'error_code': _0x8926('0x17')
                }
            });
            _0x39195c[_0x8926('0xa')](_0x3df964);
            return;
        }
    });
});
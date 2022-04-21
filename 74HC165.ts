// Add your code here

let SR_CLK = DigitalPin.P20;
let INSR0_DATA = DigitalPin.P14;        //data
let INSR0_LATCH = DigitalPin.P9;

enum KEY {
    UP = 0,
    DOWN,
    LEFT,
    RIGHT,
    A,
    B,
    MENU,
    IN1,
    IN2,
    IN3,
    IN4
};

//% weight=20 color=#3333ff icon="\uf11b"
namespace SimpleShieldKey {
    let KEYSCAN = 0;
    //% blockID==Listen_Key
    //% block="Listen_Key"
    //% weight=90
    export function Read74HC165(): void {
        KEYSCAN = 0;
        let i = 0;
        for (i = 0; i < 8; i++) {
            KEYSCAN = KEYSCAN << 1;
            let tmp = pins.digitalReadPin(INSR0_DATA);
            KEYSCAN |= tmp;
            pins.digitalWritePin(SR_CLK, 0);
            control.waitMicros(10000);
            pins.digitalWritePin(SR_CLK, 1);
            control.waitMicros(5000);
        }

        basic.showNumber(KEYSCAN);
    }

    //% blockID==Listen_Key
    //% block="Key %pin |Press"
    //% weight=90
    export function Listen_Key(pin: KEY): boolean {
        let res = 1;
        switch (pin) {
            case KEY.UP:
                res = (KEYSCAN >> 1) & 0x01;
                break;
            case KEY.DOWN:
                res = (KEYSCAN >> 2) & 0x01;
                break;
            case KEY.LEFT:
                res = (KEYSCAN >> 0) & 0x01;
                break;
            case KEY.RIGHT:
                res = (KEYSCAN >> 3) & 0x01;
                break;
            case KEY.A:
                res = (KEYSCAN >> 4) & 0x01;
                break;
            case KEY.B:
                res = (KEYSCAN >> 5) & 0x01;
                break;
            case KEY.MENU:
                res = (KEYSCAN >> 6) & 0x01;
                break;
            default:
                return false;
        }
        if (res == 1) {
            return false;
        }
        else {
            return true;
        }
    }
}


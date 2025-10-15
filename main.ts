//% color="#b37937" icon="\uf0a1" block="Broadcast"
namespace broadcast {
    let messageNames: string[] = []
    let messageIds: number[] = []
    let nextId = 1000

    function getMessageId(name: string): number {
        for (let i = 0; i < messageNames.length; i++) {
            if (messageNames[i] == name) {
                return messageIds[i]
            }
        }
        messageNames.push(name)
        messageIds.push(nextId)
        nextId += 1
        return nextId - 1
    }

    /**
     * Send a broadcast message to all receivers
     * @param name message name
     */
    //% blockId="broadcast_send" block="send message %name"
    //% weight=100
    export function send(name: string) {
        let id = getMessageId(name)
        control.raiseEvent(id, 0)
    }

    /**
     * Run code when a broadcast message is received
     * @param name message name
     * @param handler code to run when message is received
     */
    //% blockId="broadcast_onReceive" block="when message received %name"
    //% blockAllowMultiple=true
    //% weight=90
    export function onReceive(name: string, handler: () => void) {
        let id = getMessageId(name)
        control.onEvent(id, 0, handler)
    }
}

export default class Address {
    vill = ''
    po = ''
    ps = ''
    block = ''
    dist = ''
    state = ''
    pin = 0

    constructor(address?: Address) {
        this.vill = address && address.vill ? address.vill.toUpperCase() : ''
        this.po = address && address.po ? address.po.toUpperCase() : ''
        this.ps = address && address.ps ? address.ps.toUpperCase() : ''
        this.block = address && address.block ? address.block.toUpperCase() : ''
        this.dist = address && address.dist ? address.dist.toUpperCase() : ''
        this.state = address && address.state ? address.state.toUpperCase() : ''
        this.pin = address && address.pin ? (+ address.pin) : 0
    }

    json() {
        const { vill, po, ps, block, dist, state, pin } = this
        return ({ vill, po, ps, block, dist, state, pin })
    }
}
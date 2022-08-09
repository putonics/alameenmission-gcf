export default class CategoryCounter {
    category: string = ''
    male: number = 0
    female: number = 0
    other: number = 0

    constructor(cc?: CategoryCounter) {
        this.category = cc && cc.category ? cc.category : ''
        this.male = cc && cc.male ? cc.male : 0
        this.female = cc && cc.female ? cc.female : 0
        this.other = cc && cc.other ? cc.other : 0
    }

    json() {
        const { category, male = 0, female = 0, other = 0 } = this
        return ({ category, male, female, other })
    }

    remove(gender: string) {
        if (gender === 'MALE' && this.male) --this.male
        else if (gender === 'FEMALE' && this.female) --this.female
        else if (this.other) --this.other
    }

    add(gender: string) {
        if (gender === 'MALE') ++this.male
        else if (gender === 'FEMALE') ++this.female
        else ++this.other
    }

    total() {
        const { male = 0, female = 0, other = 0 } = this
        return (male + female + other)
    }
}
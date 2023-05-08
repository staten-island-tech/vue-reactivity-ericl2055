<template>
    <h1>Price</h1>
    <NumberSlide :valueList="price" symbol="$" @change="(event) => $emit('valueChange', ['price', event])" />


    <div class="checkbox-list" v-for="[key, value] in Object.entries(list)
        .map(([key, value]) => [key, value.filter((value) => value !== undefined && value !== null)])
        .filter(([key, value]) => value.length !== 0)" :key="key">
        <h1>
            {{
                key
                    .split('_')
                    .map((string) =>
                        string.match(/rpm|pwm|psu|tdp|gb|cas|ram|dpi|dvd|cd|snr|va/i)
                            ? string.toUpperCase()
                            : string[0].toUpperCase() + string.substring(1)
                    )
                    .join(' ')
            }}
        </h1>

        <div v-if="typeof value[0] === 'object'">

            <label v-if="checkInt(value)" v-for="[newKey, newValue] in convertObject(value, true)" :key="newKey + '.int'">
                <h1 class="small">
                    {{
                        newKey
                            .split('_')
                            .map((string) =>
                                string.match(/rpm|pwm|psu|tdp|gb|cas|ram|dpi|dvd|cd|snr|va/i)
                                    ? string.toUpperCase()
                                    : string[0].toUpperCase() + string.substring(1)
                            )
                            .join(' ')
                    }}
                </h1>
                <NumberSlide :valueList="[...newValue].filter((value) => value !== null)" symbol=""
                    @change="(event) => $emit('valueChange', [key, [newKey, [event]]])" />
            </label>
            <div v-else-if="value[0][0] === 'USD'">
                <NumberSlide :valueList="value.map((val) => parseFloat(val[1]) * 100).filter((value) => value !== null)"
                    symbol="¢" @change="(event) => $emit('valueChange', [key, ['USD', [event]]])" />
            </div>
            <div v-else>
                <label v-for="item in this.active[key]
                    ? convertObject(value).sort().slice(0, 5)
                    : convertObject(value).sort()" :key="item">
                    <input type="checkbox" name="option3" :value="item"
                        @change="(event) => selectedFilter(event, key, item)" />
                    <p>{{ createString(item) }}</p>
                </label>
                <button @click="this.active[key] = !this.active[key]" class="show">
                    {{ this.active[key] ? 'Show more' : 'Show less' }}
                </button>
            </div>

        </div>

        <div v-else-if="(typeof value[0] === 'number')">
            <NumberSlide :valueList="value.map((value) => parseInt(value)).filter((value) => value !== null)"
                @change="(event) => $emit('valueChange', [key, event])" />
        </div>

        <div v-else-if="value.length <= 5">
            <label v-for="item in value.sort().reverse()" :key="item">
                <input v-if="item !== null" type="checkbox" name="option3" :value="item"
                    @change="(event) => selectedFilter(event, key, item)" />
                <p v-if="item !== null">{{ item }}</p>
            </label>
        </div>

        <div v-else>
            <label v-for="item in this.active[key] ? value.sort().slice(0, 5) : value.sort()" :key="item">
                <input v-if="item !== null" type="checkbox" name="option3" :value="item"
                    @change="(event) => selectedFilter(event, key, item)" />
                <p v-if="item !== null">{{ item }}</p>
            </label>
            <button @click="this.active[key] = !this.active[key]" class="show">
                {{ this.active[key] ? 'Show more' : 'Show less' }}
            </button>
        </div>
    </div>
</template>

<script>
import NumberSlide from './NumberSlide.vue'
export default {
    name: 'FilterComponent',
    emits: ['filterControl', 'valueChange'],
    components: {
        NumberSlide
    },
    data() {
        return {
            active: {},
            price: []
        }
    },
    props: {
        list: {
            type: Object,
            required: true
        }
    },
    methods: {
        selectedFilter(event, key, filter) {
            if (event.target.checked) {
                this.$emit('filterControl', [key, filter, true])
            } else {
                this.$emit('filterControl', [key, filter, false])
            }
        },
        activeList(obj) {
            return Object.keys(obj).reduce((acc, key) => {
                acc[key] = true
                return acc
            }, {})
        },
        createPrice(value) {
            return value === undefined ? [] : value.map((price) => parseInt(price[1]))
        },
        checkInt(value) {
            try {
                this.convertObject(value).forEach((value) => {
                    if (
                        typeof value[0][1] === 'number' ||
                        typeof value[1][1] === 'number' ||
                        typeof value[2][1] === 'number'
                    ) {
                        throw 'BreakException'
                    }
                })
            } catch (e) {
                if (e === 'BreakException') {
                    return true
                }
            }
        },
        convertObject(value, int) {
            if (int) {
                return Object.entries(
                    value.reduce((acc, obj) => {
                        Object.entries(obj).forEach(([key, value]) => {
                            acc[key] = (acc[key] || new Set()).add(value)
                        })
                        return acc
                    }, {})
                )
            } else {
                return value.map((value) => Object.entries(value))
            }
        },
        createString(item) {
            return item
                .reduce((acc, arr) => {
                    if (arr[1] === null) {
                        acc.push(arr[0][0].toUpperCase() + arr[0].substring(1) + ': ' + 'N/A')
                    } else {
                        acc.push(arr[0][0].toUpperCase() + arr[0].substring(1) + ': ' + arr[1])
                    }
                    return acc
                }, [])
                .reduce((acc, string) => (acc.length === 0 ? acc + string : acc + ', ' + string), '')
        }
    },
    watch: {
        list(newValue, oldValue) {
            this.active = this.activeList(newValue)
            this.price = this.createPrice(newValue.price)
            delete this.list.price
        }
    },
}
</script>
<style scoped>
.checkbox-list label {
    display: block;
    margin-bottom: 10px;
    line-height: 1.5;
    align-items: center;
}

h1 {
    font-size: 25px;
    margin: 0;
}

p {
    display: inline-block;
    font-size: 12px;
}

.checkbox-list input[type='checkbox'] {
    display: inline-block;
    margin-right: 10px;
    top: 1px;
}

.show {
    font-size: 12px;
    border: none;
    background: none;
    color: rgb(113, 113, 230);
    text-decoration: underline;
    cursor: pointer;
}

.small {
    font-size: 15px;
}
</style>

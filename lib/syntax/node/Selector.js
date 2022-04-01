import { calculate } from '@bramus/specificity/core';
export const name = 'Selector';
export const structure = {
    children: [[
        'TypeSelector',
        'IdSelector',
        'ClassSelector',
        'AttributeSelector',
        'PseudoClassSelector',
        'PseudoElementSelector',
        'Combinator',
        'WhiteSpace'
    ]]
};

export function parse() {
    const children = this.readSequence(this.scope.Selector);

    // nothing were consumed
    if (this.getFirstListNode(children) === null) {
        this.error('Selector is expected');
    }

    let specificity = null;

    return {
        type: 'Selector',
        loc: this.getLocationFromList(children),
        children,
        get specificity() {
            if (!specificity) {
                specificity = calculate(this)[0];
            }
            return specificity;
        }
    };
}

export function generate(node) {
    this.children(node);
}

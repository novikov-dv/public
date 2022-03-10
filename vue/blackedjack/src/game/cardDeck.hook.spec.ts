import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { useCardDeck } from "./cardDeck.hook";
import { CardName, CardSuit } from './types';

Vue.use(VueCompositionAPI);

describe('cardDeck.hook.ts', () => {
  const {
    cards,
    getScore,
    resetTo52Cards,
    shuffle,
    getTopCard,
    peekTopCard,
    takeCard
  } = useCardDeck();

  it('checks initial state', () => {
    expect(cards.value.length).toEqual(0);
    expect(getScore()).toEqual(0);
  });

  it('checks 52 cards state', () => {
    resetTo52Cards();
    expect(cards.value.length).toEqual(52);
  });

  it('checks shuffle', () => {
    resetTo52Cards();
    const initialStamp = cards.value.map(card => card.name + card.score).join();
    shuffle();
    const finalStamp = cards.value.map(card => card.name + card.score).join();
    expect(initialStamp).not.toEqual(finalStamp);
  });

  it('checks getTopCard', () => {
    resetTo52Cards();
    const cardsCount = cards.value.length;
    const topCard = getTopCard();
    expect(topCard.name).toEqual(CardName.ACE);
    expect(topCard.suit).toEqual(CardSuit.DIAMOND);
    expect(cards.value.length).toEqual(cardsCount - 1);
  });

  it('checks peekTopCard', () => {
    resetTo52Cards();
    const cardsCount = cards.value.length;
    const topCard = peekTopCard();
    expect(topCard.name).toEqual(CardName.ACE);
    expect(topCard.suit).toEqual(CardSuit.DIAMOND);
    expect(cards.value.length).toEqual(cardsCount);
  });

  it('checks takeCard', () => {
    resetTo52Cards();
    const cardsCount = cards.value.length;
    const topCard = getTopCard();
    takeCard(topCard);
    expect(topCard.name).toEqual(CardName.ACE);
    expect(topCard.suit).toEqual(CardSuit.DIAMOND);
    expect(cards.value.length).toEqual(cardsCount);
  });
}); // INFO: я далеко не всё тестами покрыл в целях экономии времени, зато навык написания тестов продемонстрирован

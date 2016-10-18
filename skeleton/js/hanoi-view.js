class HanoiView {

  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.firstTower = null;
    this.secondTower = null;
    this.clickTower();
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      let $ul = $("<ul class='hover group'>");
      $ul.data("tower", i);
      for (let j = 0; j < 3; j++) {
        let $li = $("<li>");
        $li.data("pos", j);
        $ul.append($li);
      }
      this.$el.append($ul);
    }
  }

  render() {
    let state = this.game.towers;
    $("li").removeClass();
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        $("ul").eq(i).children().eq(2 - j).addClass(`disk${state[i][j]}`);
      }
    }
  }

  clickTower() {
    $("ul").on("click", event => {
      let $currentTarget = $(event.currentTarget);
      if (this.firstTower === null) {
        this.firstTower = parseInt($currentTarget.data("tower"));
        $currentTarget.addClass("selected");
      } else {
        this.secondTower = parseInt($currentTarget.data("tower"));
        if (this.game.move(this.firstTower, this.secondTower) === false) {
          alert("Invalid move");
        }
        $("ul").eq(this.firstTower).removeClass("selected");
        this.render();
        if (this.game.isWon()) {
          alert("YOU WON!");
          event.preventDefault();
        }
        this.firstTower = null;
        this.secondTower = null;
      }
    });
  }

}

module.exports = HanoiView;

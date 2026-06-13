class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

class HanoiTower<T = number> {
  private rods: Record<string, Stack<T>> = {};

  constructor(
    private fromRod: string = 'First',
    private toRod: string = 'Second',
    private auxRod: string = 'Third'
  ) {
    this.rods[this.fromRod] = new Stack<T>();
    this.rods[this.toRod] = new Stack<T>();
    this.rods[this.auxRod] = new Stack<T>();
  }

  private getRod(name: string): Stack<T> {
    const rod = this.rods[name];

    if (!rod) {
      throw new Error(`Стержень "${name}" не найден`);
    }

    return rod;
  }

  addDisks(disks: T[]): void {
    for (const disk of disks) {
      this.getRod(this.fromRod).push(disk);
    }
  }

  solve(): void {
    const numberOfDisks = this.getRod(this.fromRod).size();
    this.move(numberOfDisks, this.fromRod, this.toRod, this.auxRod);
  }

  private move(n: number, from: string, to: string, aux: string): void {
    if (n === 0) {
      return;
    }

    this.move(n - 1, from, aux, to);

    const disk = this.getRod(from).pop();

    if (disk !== undefined) {
      this.getRod(to).push(disk);
      console.log(`Переместить диск ${disk} с ${from} на ${to}`);
    }

    this.move(n - 1, aux, to, from);
  }
}

const hanoiNumber = new HanoiTower();
hanoiNumber.addDisks([3, 2, 1]);
hanoiNumber.solve();

console.log('----------------');

const hanoiString = new HanoiTower<string>('A', 'C', 'B');
hanoiString.addDisks(['C', 'B', 'A']);
hanoiString.solve();
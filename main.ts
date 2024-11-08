interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface MenuItem {
  title: string;
  action: () => void;
}

class Menu {
  private items: MenuItem[] = [];

  addItem(item: MenuItem): void {
    this.items.push(item);
  }

  showMenu(): void {
    console.log("Menu:");
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
    });
  }

  selectItem(index: number): void {
    if (index >= 1 && index <= this.items.length) {
      this.items[index - 1].action();
    } else {
      console.log("Invalid option.");
    }
  }
}

const mergePostWithUsers = (posts: Post[], users: User[]) => {
  return posts.map((post) => {
    const user = users.find((user) => user.id === post.userId);
    return {
      ...post,
      user,
    };
  });
};

const getUserIdByPost = (posts: Post[]) => {
  const userIds = posts.reduce((acc, item) => {
    if (!acc.includes(item.userId)) {
      acc.push(item.userId);
    }
    return acc;
  }, [] as number[]);
  return userIds;
};

// Configure menu
const menu = new Menu();
menu.addItem({
  title: "Merge Post With Users",
  action: () => {
    console.log("Calling mergePostWithUsers...");
    const posts: Post[] = [
      { id: 1, userId: 1, title: "Post 1", body: "Content 1" },
      { id: 2, userId: 2, title: "Post 2", body: "Content 2" },
    ];
    const users: User[] = [
      { id: 1, name: "User 1", username: "user1", email: "user1@example.com" },
      { id: 2, name: "User 2", username: "user2", email: "user2@example.com" },
    ];
    const result = mergePostWithUsers(posts, users);
    console.log("MergePostWithUsers result:", JSON.stringify(result, null, 2));
  },
});
menu.addItem({
  title: "Get User IDs By Post",
  action: () => {
    console.log("Calling getUserIdByPost...");
    const posts: Post[] = [
      { id: 1, userId: 1, title: "Post 1", body: "Content 1" },
      { id: 2, userId: 2, title: "Post 2", body: "Content 2" },
      { id: 3, userId: 1, title: "Post 3", body: "Content 3" },
    ];
    const result = getUserIdByPost(posts);
    console.log("GetUserIdByPost result:", JSON.stringify(result, null, 2));
  },
});

// Show menu
menu.showMenu();

// Select options (uncomment to use)
//menu.selectItem(1);
menu.selectItem(1);
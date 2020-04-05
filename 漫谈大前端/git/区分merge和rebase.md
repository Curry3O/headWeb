## Git merge和rebase分支合并命令的区别
> 在使用 git 进行版本管理的项目中，当完成一个特性的开发并将其合并到 master 分支时，我们有两种方式：git merge 和 git rebase。通常，我们对 git merge 使用的较多，而对于 git rebase 使用的较少，其实 git rebase 也是极其强大的一种方法。下面我们就来讲一讲 git merge 和 git rebase 的差别和在实际中的使用。

为了更好地观察执行 git merge 和 git rebase 之后发生的现象，我们首先来做一些准备工作，即创建一个项目仓库，然后在其中构建两条分支，再增加几次提交(参考图p1、p2.png)
> 具体如下：
- 创建一个目录 gitTest
- 在目录 myTest 中新建一个文件 readme.md，随便添加一个标题，和第一个列表项 add master1 并提交到本地仓库
- 在当前分支的基础上新建一条分支，名为 feature，将列表项 add master1 修改为 add feature1 并提交到本地仓库
- 随后切换到分枝 master 上添加一个新的列表项 add master2 并提交到本地仓库
- 随后切换到分枝 feature 上添加一个新的列表项 add feature2 并提交到本地仓库
- 重复上面的步骤 4 和 5，直至在 master 和 feature 上各添加了 4 条列表项


#### git merge
从目录 gitTest 拷贝出一份来，命名为 gitMerge 来进行我们的合并操作。

> git merge 的使用方法很简单，假如你想将分支 feature 合并到分支 master，那么只需执行如下两步即可(参考图 gitMerge.png):
- 将分支切换到 master 上去：git checkout master
- 将分支 feature 合并到当前分支（即 master 分支）上：git merge feature

> git merge 有如下特点：
- 只处理一次冲突
- 引入了一次合并的历史记录，合并后的所有 commit 会按照提交时间从旧到新排列
- 所有的过程信息更多，可能会提高之后查找问题的难度

为什么讲 git merge 提交的信息过多可能会影响查找问题的难度呢？因为在一个大型项目中，单纯依靠 git merge 方法进行合并，会保存所有的提交过程的信息：引出分支，合并分支，在分支上再引出新的分支等等，类似这样的操作一多，提交历史信息就会显得杂乱，这时如果有问题需要查找就会比较困难了(参考图 p3.png)。


#### git rebase
与 git merge 一致，git rebase 的目的也是将一个分支的更改并入到另外一个分支中去(参考图 gitRebase.png)。

> 主要特点如下：
- 改变当前分支从 master 上拉出分支的位置
- 没有多余的合并历史的记录，且合并后的 commit 顺序不一定按照 commit 的提交时间排列
- 可能会多次解决同一个地方的冲突（有 squash 来解决）
- 更清爽一些，master 分支上每个 commit 点都是相对独立完整的功能单元

> 那么我们现在来具体操作一下，看看 git rebase 是如何做的。首先，和 git merge 不同的是，你需要在 feature 分支上进行 git rebase master 的操作，意味着让当前分支 feature 相对于 分支 master 进行变基：(参考图 p4.png)可以看出，我们遇到了冲突，进行对比的双方分别是 master 分支的最新内容和 feature 分支的第一次提交的内容，上图下方红框内容告诉我们，在我们解决了冲突之后，需要执行 git rebase --continue 来继续变基的操作。

> 在解决冲突之后执行 git rebase --continue 时遇到了提示，看来我们首先需要把我们的修改存到暂存区，随后再执行 git rebase --continue。执行之后又遇到了冲突，这次是与 feature 分支的第二次提交进行对比出现的冲突，意味着我们需要多次解决同一个地方的冲突(参考图 p5.png)。

> 继续重复先解决冲突，再 git rebase --continue 的步骤，直到遇到：(参考图 p5.png)

> 意味着完成了 feature 最后一次提交的变基操作，至此整个变基就完成了。再来看看执行 git rebase 之后的 feature 分支：(参考图 p6.png)

> 完全符合上面所说的执行 git rebase 的特点，我们引出 feature 分支的位置变了，没有多余的提交历史，且提交的时序也改变了，另外回忆一下，在我们执行变基的过程中也多次解决了同一个地方的冲突。这个时候我们再切换到 master 分支上，将 feature 分支合并进来(参考图 p7.png)。

> 看得出来，feature 分支上的所有提交信息都会被合并到 master 分支上了，这些信息对我们来说不是必要的，我们在 masetr 分支上往往只需要知道合并进来了什么新的功能即可，这些多余的信息可以通过 git rebase 的交互模式进行整合。

###### 总结
> 当需要保留详细的合并信息的时候建议使用git merge，特别是需要将分支合并进入master分支时；当发现自己修改某个功能时，频繁进行了git commit提交时，发现其实过多的提交信息没有必要时，可以尝试git rebase。

> 在项目中经常使用git pull来拉取代码，git pull相当于是git fetch + git merge，如果此时运行git pull -r，也就是git pull –rebase，相当于git fetch + git rebase

###### git branch
> 一般用于分支的操作，比如创建分支，查看分支等等
- git branch：不带参数：列出本地已经存在的分支，并且在当前分支的前面用"*"标记
- git branch -r：查看远程版本库分支列表
- git branch -a：查看所有分支列表，包括本地和远程
- git branch dev：创建名为dev的分支，创建分支时需要是最新的环境，创建分支但依然停留在当前分支
- git branch -d dev：删除dev分支，如果在分支中有一些未merge的提交，那么会删除分支失败，此时可以使用 git branch -D dev：强制删除dev分支，
- git branch -vv：可以查看本地分支对应的远程分支
- git branch -m oldName newName：给分支重命名

例如输入：git branch，
显示：   feature
        *master
表示:总共有两只分支，并且当前在master分支上


#### git checkout
1. 操作文件  2. 操作分支

> 操作文件
- git checkout -- filename：放弃单个文件的修改
- git checkout .：放弃当前目录下的修改

> 操作分支
- git checkout master：将分支切换到master(也可以写成:git switch master)
- git checkout -b master：如果分支存在则只切换分支，若不存在则创建并切换到master分支，repo start是对git checkout -b这个命令的封装，将所有仓库的分支都切换到master，master是分支名(也可以写成:git switch -c master)

>  查看帮助
- git checkout --help：查看帮助
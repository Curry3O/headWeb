### Git工作流程(参考图：git总汇)
> 工作区(Workspace)
程序员进行开发改动的地方，是你当前看到的，也是最新的。
平常我们开发就是拷贝远程仓库中的一个分支，基于该分支进行开发。在开发过程中就是对工作区的操作。

> 暂存区(Index / Stage)
.git目录下的index文件, 暂存区会记录git add添加文件的相关信息(文件名、大小、timestamp...)，不保存文件实体, 通过id指向每个文件实体。可以使用git status查看暂存区的状态。暂存区标记了你当前工作区中，哪些内容是被git管理的。;

当你完成某个需求或功能后需要提交到远程仓库，那么第一步就是通过git add先提交到暂存区，被git管理。

> 本地仓库(Repository)
保存了对象被提交过的各个版本，比起工作区和暂存区的内容，它要更旧一些。

git commit后同步index的目录树到本地仓库，方便从下一步通过git push同步本地仓库与远程仓库的同步。

> 远程仓库(Remote)
远程仓库的内容可能被分布在多个地点的处于协作关系的本地仓库修改，因此它可能与本地仓库同步，也可能不同步，但是它的内容是最旧的。

###### 小结
- 任何对象都是在工作区中诞生和被修改；
- 任何修改都是从进入index区才开始被版本控制；
- 只有把修改提交到本地仓库，该修改才能在仓库中留下痕迹；
- 与协作者分享本地的修改，可以把它们push到远程仓库来共享。


#### HEAD
> HEAD，它始终指向当前所处分支的最新的提交点。你所处的分支变化了，或者产生了新的提交点，HEAD就会跟着改变。
它是一个指向你正在工作中的本地分支的指针，可以将 HEAD 想象为当前分支的别名。

例子1:
> git log :日志展示中HEAD -> master指的是当前分支指向的是master分支。
```
$ git log
commit 1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master)
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:06:15 2018 +0800

    append GPL

commit e475afc93c209a690c39c13a46716e8fa000c366
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:03:36 2018 +0800

    add distributed

commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 20:59:18 2018 +0800

    wrote a readme file
```
> git log命令显示从最近到最远的提交日志,如果嫌输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline参数：
```
$ git log --pretty=oneline
1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master) append GPL
e475afc93c209a690c39c13a46716e8fa000c366 add distributed
eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0 wrote a readme file
```


例子2:
> 在Git中，用HEAD表示当前版本，比如在上面最新的提交1094adb...上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

> git reset HEAD <file> :指的是恢复到当前分支中文件的状态。

> 现在，我们要把当前版本append GPL回退到上一个版本add distributed，就可以使用git reset命令：

```
$ git reset --hard HEAD^
HEAD is now at e475afc add distributed
```

Git的版本回退速度非常快，因为Git在内部有个指向当前版本的HEAD指针，当你回退版本的时候，Git仅仅是把HEAD从指向append GPL改为指向add distributed。

> 如果想变好原来 append GPL 版本

```
$ git reset --hard 1094a
HEAD is now at 83b0afe append GPL
```

> 当你用$ git reset --hard HEAD^回退到add distributed版本时，再想恢复到append GPL，就必须找到append GPL的commit id。Git提供了一个命令git reflog用来记录你的每一次命令：

```
$ git reflog
e475afc HEAD@{1}: reset: moving to HEAD^
1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
e475afc HEAD@{3}: commit: add distributed
eaadf4e HEAD@{4}: commit (initial): wrote a readme file
```
从输出可知，append GPL的commit id是1094adb


#### add
> add相关命令很简单，主要实现将工作区修改的内容提交到暂存区，交由git管理。
- git add . :添加当前目录的所有文件到暂存区
- git add [dir] :添加指定目录到暂存区，包括子目录
- git add [file] :添加指定文件到暂存区


#### commit
> commit相关命令也很简单，主要实现将暂存区的内容提交到本地仓库，并使得当前分支的HEAD向后移动一个提交点。
- git commit -m [message] :提交暂存区到本地仓库,message代表说明信息
- git commit [file1] -m [message] :提交暂存区的指定文件到本地仓库
- git commit --amend -m [message] :使用一次新的commit，替代上一次提交


#### branch
> 涉及到协作，自然会涉及到分支，关于分支，大概有展示分支，切换分支，创建分支，删除分支这四种操作。
- git branch :列出所有本地分支
- git branch -r :列出所有远程分支
- git branch -a :列出所有本地分支和远程分支
- git branch [branch-name] :新建一个分支，但依然停留在当前分支
- git checkout -b [branch-name] :新建一个分支，并切换到该分支(等同于：git switch -c [branch-name])
- git branch --track [branch][remote-branch] :新建一个分支，与指定的远程分支建立追踪关系
- git checkout [branch-name] :切换到指定分支，并更新工作区(等同于：git switch [branch-name])
- git branch -d [branch-name] :删除分支
- git push origin --delete [branch-name] :删除远程分支


#### merge
> merge命令把不同的分支合并起来。在实际开放中，我们可能从master分支中切出一个分支，然后进行开发完成需求，中间经过R3,R4,R5的commit记录，最后开发完成需要合入master中，这便用到了merge。git merge操作会生成一个新的节点，之前的提交分开显示。
- git fetch [remote] :merge之前先拉一下远程仓库最新代码
- git merge [branch] :合并指定分支到当前分支


#### rebase
> rebase又称为衍合，是合并的另外一种选择。在开始阶段，我们处于new分支上，执行git rebase dev，那么new分支上新的commit都在master分支上重演一遍，最后checkout切换回到new分支。这一点与merge是一样的，合并前后所处的分支并没有改变。git rebase dev，通俗的解释就是new分支想站在dev的肩膀上继续下去。rebase也需要手动解决冲突。git rebase操作不会生成新的节点，是将两个分支融合成一个线性的提交。

> 如果你想要一个干净的，没有merge commit的线性历史树，那么你应该选择git rebase;如果你想保留完整的历史记录，并且想要避免重写commit history的风险，你应该选择使用git merge。


### reset
> reset命令把当前分支指向另一个位置，并且相应的变动工作区和暂存区。
- git reset -- soft [commit] :只改变提交点，暂存区和工作目录的内容都不改变
- git reset -- mixed [commit] :改变提交点，同时改变暂存区的内容(默认)
- git reset -- hard [commit] :暂存区、工作区的内容都会被修改到与提交点完全一致的状态
- git reset -- hard HEAD :让工作区回到上次提交时的状态


#### revert
> git revert用一个新提交来消除一个历史提交所做的任何修改。
- git revert :用于反转提交,执行evert命令时要求工作树必须是干净的,用一个新提交来消除一个历史提交所做的任何修改。


#### push
> 上传本地仓库分支到远程仓库分支，实现同步。
- git push [remote][branch] :上传本地指定分支到远程仓库
- git push [remote] -- force	:强行推送当前分支到远程仓库，即使有冲突
- git push [remote] -- all :推送所有分支到远程仓库


#### 其他命令
- git status :显示有变更的文件
- git log :显示当前分支的版本历史
- git diff :显示暂存区和工作区的差异
- git diff HEAD :显示工作区与当前分支最新commit之间的差异
- git cherry-pick [commit] :选择一个commit，合并进当前分支

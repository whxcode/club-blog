import React, { memo } from 'react'
import Avatar from "@/components/Avatar"
import './index.less'
const Profile = memo(() => {
    return <article className="view-profile">
        <header className="top">
            <h1 className="title">Profile</h1>
            <h1 className="more">...</h1>
        </header>
        <section className="user-card">
            <div className="user-info">
                <div className="avatar">
                    <Avatar src={''}/>
                </div>
                <div className="base">
                    <p className="email">@google.com</p>
                    <h1 className="name">Jovi Daniel</h1>
                    <h2 className="vocation">designer</h2>
                </div>
            </div>
            <div className="about-me">
                <h2 className="label">About me</h2>
                <div className="brief">
                    Madison Blackstone is a director of user experience design, with experience managing global teams.
                </div>
            </div>
            <div className="discover">
                <div className="post">
                    <h1 className="number">52</h1>
                    <p className="label">Post</p>
                </div>
                <div className="following">
                    <h1 className="number">52</h1>
                    <p className="label">following</p>
                </div>
                <div className="followers">
                    <h1 className="number">4.5k</h1>
                    <p className="label">followers</p>
                </div>
            </div>
        </section>
        <section className="posts">
            <div className="posts-top">
                <h1 className="title">My Posts</h1>
                <div className="tools">
                    <span className="row">r</span>
                    <span className="column">l</span>
                </div>
            </div>
        </section>
    </article>
})
export default Profile
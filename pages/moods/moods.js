import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  CloudIcon, SunIcon, BellIcon, Battery0Icon,
} from '@heroicons/react/24/outline';
import {
  TbMoodTongue, TbMoodConfuzed, TbMoodNeutral,
} from 'react-icons/tb';
import { GiMapleLeaf } from 'react-icons/gi';
import { ImHeartBroken } from 'react-icons/im';
import { IoIosWine } from 'react-icons/io';
import {
  BsFillCloudLightningRainFill, BsFillMoonStarsFill, BsEmojiExpressionless, BsEmojiWink, BsSkipBackward, BsSnow2,
} from 'react-icons/bs';

export default function moods() {
  return (
    <div className="moodBoardPage">
      <Head>
        <title>POPPED:moods</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>;
      <h1 className="moodsHeader">moods</h1>
      <div className="mainMoodsDiv">
        <Link className="anxiousDiv" passHref href="/moods/anxious">
          <div className="anxiousIconDiv">
            <BellIcon className="anxiousIcon" />
            <h3 className="anxiousText">anxious</h3>
          </div>
        </Link>
        <Link className="blahDiv" passHref href="/moods/blah">
          <div className="blahIconDiv">
            <BsEmojiExpressionless className="blahIcon" />
            <h3 className="blahText">blah</h3>
          </div>
        </Link>
        <Link className="boredDiv" passHref href="/moods/bored">
          <div className="boredIconDiv">
            <TbMoodConfuzed className="boredIcon" />
            <h3 className="boredText">bored</h3>
          </div>
        </Link>
        <Link className="buzzedDiv" passHref href="/moods/buzzed">
          <div className="buzzedIconDiv">
            <IoIosWine className="buzzedIcon" />
            <h3 className="buzzedText">buzzed</h3>
          </div>
        </Link>
        <Link className="chillDiv" passHref href="/moods/chill">
          <div className="chillIconDiv">
            <BsSnow2 className="chillIcon" />
            <h3 className="chillText">chill</h3>
          </div>
        </Link>
        <Link className="happyDiv" passHref href="/moods/happy">
          <div className="happyIconDiv">
            <SunIcon className="happyIcon" />
            <h3 className="happyText">happy</h3>
          </div>
        </Link>
        <Link className="heartbrokenDiv" passHref href="/moods/heartbroken">
          <div className="heartbrokenIconDiv">
            <ImHeartBroken className="heartbrokenIcon" />
            <h3 className="heartbrokenText">heartbroken</h3>
          </div>
        </Link>
        <Link className="highDiv" passHref href="/moods/high">
          <div className="highIconDiv">
            <GiMapleLeaf className="highIcon" />
            <h3 className="highText">high</h3>
          </div>
        </Link>
        <Link className="mischievousDiv" passHref href="/moods/mischievous">
          <div className="mischievousIconDiv">
            <BsEmojiWink className="mischievousIcon" />
            <h3 className="mischievousText">mischievous</h3>
          </div>
        </Link>
        <Link className="moodyDiv" passHref href="/moods/moody">
          <div className="moodyIconDiv">
            <BsFillCloudLightningRainFill className="moodyIcon" />
            <h3 className="moodyText">moody</h3>
          </div>
        </Link>
        <Link className="nostalgicDiv" passHref href="/moods/nostalgic">
          <div className="nostalgicIconDiv">
            <BsSkipBackward className="nostalgicIcon" />
            <h3 className="nostalgicText">nostalgic</h3>
          </div>
        </Link>
        <Link className="sadDiv" passHref href="/moods/sad">
          <div className="sadIconDiv">
            <CloudIcon className="sadIcon" />
            <h3 className="sadText">sad</h3>
          </div>
        </Link>
        <Link className="sickDiv" passHref href="/moods/sick">
          <div className="sickIconDiv">
            <Battery0Icon className="sickIcon" />
            <h3 className="sickText">sick</h3>
          </div>
        </Link>
        <Link className="sillyDiv" passHref href="/moods/silly">
          <div className="sillyIconDiv">
            <TbMoodTongue className="sillyIcon" />
            <h3 className="sillyText">silly</h3>
          </div>
        </Link>
        <Link className="stressedDiv" passHref href="/moods/stressed">
          <div className="stressedIconDiv">
            <TbMoodNeutral className="stressedIcon" />
            <h3 className="stressedText">stressed</h3>
          </div>
        </Link>
        <Link className="wistfulDiv" passHref href="/moods/wistful">
          <div className="wistfulIconDiv">
            <BsFillMoonStarsFill className="wistfulIcon" />
            <h3 className="wistfulText">wistful</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
